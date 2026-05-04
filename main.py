import webview
import PIL.Image
import os
import base64
import subprocess
import sys
from io import BytesIO

class Api:
    def __init__(self):
        self._window = None

    def set_window(self, window):
        self._window = window

    def select_and_compress(self, quality_val):
        result = self._window.create_file_dialog(webview.OPEN_DIALOG,
                                                 allow_multiple=True,
                                                 file_types=('Image Files (*.jpg;*.png;*.jpeg)',))
        
        if not result or len(result) == 0:
            return "Cancelled"
        
        file_path = result[0]
        
        save_path = self._window.create_file_dialog(webview.SAVE_DIALOG, save_filename='compressed_image.jpg')
        
        if not save_path:
            return "Save Cancelled"

        img = PIL.Image.open(file_path).convert("RGB")
        img.save(save_path, "JPEG", quality=int(quality_val), optimize=True)
        return f"Successfully saved to {os.path.basename(save_path)}"

    def get_save_folder(self):
        if hasattr(self, 'last_folder') and self.last_folder:
            return self.last_folder
        
        print("Opening Folder Dialog...")
        folder_result = self._window.create_file_dialog(webview.FOLDER_DIALOG)
        
        if not folder_result:
            return None
        
        self.last_folder = folder_result[0] if isinstance(folder_result, (list, tuple)) else folder_result
        return self.last_folder

    def compress_dropped_image(self, base64_str, filename, quality_val):
        try:
            if not hasattr(self, 'last_folder') or not self.last_folder:
                return "Error: No folder selected"

            if "," in base64_str:
                base64_str = base64_str.split(",")[1]
            img_data = base64.b64decode(base64_str)
            img = PIL.Image.open(BytesIO(img_data)).convert("RGB")

            final_folder = os.path.normpath(self.last_folder)
            save_path = os.path.join(final_folder, f"compressed_{filename}.jpg")
            
            img.save(save_path, "JPEG", quality=int(quality_val), optimize=True)
            print(f"Success: Saved {filename}")
            return f"Successfully saved {filename}"

        except Exception as e:
            import traceback
            traceback.print_exc()
            return f"Error: {str(e)}"

    def open_output_folder(self):
        print(f"open_output_folder called")
        print(f"last_folder = {getattr(self, 'last_folder', 'NOT SET')}")

        if not hasattr(self, 'last_folder') or not self.last_folder:
            return "No folder selected yet"

        folder = os.path.normpath(self.last_folder)
        print(f"Opening: {folder}")

        if sys.platform == "win32":
            os.startfile(folder)
        elif sys.platform == "darwin":
            subprocess.Popen(["open", folder])
        else:
            subprocess.Popen(["xdg-open", folder])

        return "Opened"

# --- Launch Logic ---
api = Api()
window = webview.create_window('iLoveIMG Clone', 'http://localhost:5173', js_api=api, width=1000, height=800)
api.set_window(window)
webview.start()