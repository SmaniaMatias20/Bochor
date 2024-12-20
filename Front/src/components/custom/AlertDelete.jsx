import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../shadcn/alert-dialog";

const AlertDelete = ({ open, setOpen, onDelete, selectedItemId, title, description, textButtonAceptar, textButtonCancelar }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild></AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                        onClick={() => setOpen(false)}
                    >
                        {textButtonCancelar}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-sky-900 text-white font-bold py-2 px-4 rounded hover:bg-sky-950 transition duration-300"
                        onClick={() => onDelete(selectedItemId)}
                    >
                        {textButtonAceptar}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDelete;
