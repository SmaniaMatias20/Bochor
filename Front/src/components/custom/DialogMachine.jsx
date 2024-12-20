import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogClose } from '../shadcn/dialog';
import { Button } from '../shadcn/button';

const DialogMachine = ({
    open,
    onOpenChange,
    title,
    message,
    onConfirm,
    confirmText,
    cancelText
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <p>{message}</p>
                <DialogFooter>
                    <Button
                        className="bg-sky-900 text-white font-bold py-2 px-4 rounded hover:bg-sky-950 transition duration-300"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                    <DialogClose asChild>
                        <Button
                            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                            variant="secondary"
                        >
                            {cancelText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogMachine;