import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogClose } from '../shadcn/dialog';
import { Button } from '../shadcn/button';
import { Input } from '../shadcn/input';
import { Label } from '../shadcn/label';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../shadcn/select';

const DialogCreateEntity = ({
    entity,
    open,
    onOpenChange,
    title,
    fields,
    onSubmit,
    errors,
    submitButtonText,
    cancelButtonText,
}) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <div className="flex justify-center mt-7 mb-8">
                    <Button className="w-auto rounded-lg px-6 py-2 bg-sky-900 text-white font-bold hover:bg-sky-950 transition duration-300">
                        {title}
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>{title}</DialogTitle>

                <form onSubmit={onSubmit}>
                    {fields.map((field, index) => (
                        <div className="mb-4" key={index}>
                            <Label htmlFor={field.accessor}>{field.label}:</Label>
                            {field.type === 'select' ? (
                                <Select
                                    id={field.accessor}
                                    name={field.accessor}
                                    value={field.value}
                                    onValueChange={(value) => field.onChange({ target: { name: field.accessor, value } })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Selecciona ${field.label}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    id={field.accessor}
                                    name={field.accessor}
                                    type={field.type}
                                    value={field.value}
                                    onChange={field.onChange}
                                    required
                                />
                            )}
                            {errors[field.accessor] && <span className="text-red-500 text-sm">{errors[field.accessor]}</span>}
                        </div>
                    ))}

                    <DialogFooter>
                        <Button className="bg-sky-900 text-white font-bold py-2 px-4 rounded hover:bg-sky-950 transition duration-300" type="submit">
                            {submitButtonText}
                        </Button>
                        <DialogClose asChild>
                            <Button className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300" variant="secondary">
                                {cancelButtonText}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCreateEntity;
