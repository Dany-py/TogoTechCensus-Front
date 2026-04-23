
import ReactDOM from "react-dom";
import type { ModalProps } from "../../types/Modal.ts";

function Modal({ component, className = "", onClose }: ModalProps & { onClose: () => void }) {
    return ReactDOM.createPortal(
        <div
            className={`modal-overlay ${className}`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                zIndex: 9999,
                overflowY: "auto",
                padding: "24px 16px",
            }}
        >
            <div
                className="modal-content"
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "700px",
                    margin: "auto",
                    borderRadius: "20px",
                    backdropFilter: "blur(15px)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                    overflow: "hidden",
                }}
            >
                {/* Close button */}
                <button className="ms-auto btn rounded-circle"
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        zIndex: 10,
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(0,0,0,0.12)",
                        background: "white",
                        color: "#444",
                        fontSize: "18px",
                        lineHeight: 1,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                        transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseOver={(e) => Object.assign(e.currentTarget.style, { background: "rgba(40,167,69,0.09)" })}
                    onMouseOut={(e) => Object.assign(e.currentTarget.style, { background: "white", color: "#444" })}
                    aria-label="Fermer"
                >
                    ×
                </button>

                {component}
            </div>
        </div>,
        document.body
    );
}

export default Modal;