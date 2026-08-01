type ModalProps = {
    component: React.ReactElement;
    className?: string;
    onClose?: () => void; // Ajouté pour permettre la fermeture depuis le parent
};

export type { ModalProps };