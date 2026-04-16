
import ReactDOM from "react-dom";
import type { ModalProps } from "../../types/Modal.ts";

function Modal({ component, className = "", onClose }: ModalProps & { onClose: () => void }) {
    return ReactDOM.createPortal(
        <div className={`modal-overlay ${className}`}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 9999,
            }}
        >
            <div className="modal-content"
            style={{
                position: "relative",
                width: '50%',
                maxHeight: '80vh',
                overflowY: 'auto',
                display: "flex",
                alignItems: "center",
                backgroundColor: 'rgba(40, 167, 69, 0.04)',
                borderRadius:'20px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 5px 10px rgb(255, 252, 252)',
                }}
            >
                {component}
                <span 
                    className="ms-auto btn rounded-circle"
                    onClick={onClose}
                    style = {{
                        position: 'absolute',
                        width: '1.5em',
                        height: '1.5em',
                        fontSize: '2em',
                        background: 'white',
                        color: 'black',
                        right: '0',
                    }}
                >
                    ˟
                </span>
            </div>
        </div>,
        document.body
    );
}

export default Modal;