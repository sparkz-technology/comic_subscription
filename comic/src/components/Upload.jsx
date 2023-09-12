import Button from "../ui/Button";
import Modal from "../ui/Modal";
import UploadComicBook from "./UploadComicBook";

function Upload() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="comic">
          <Button>Upload file</Button>
        </Modal.Open>
        <Modal.Window name="comic">
          <UploadComicBook />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default Upload;
