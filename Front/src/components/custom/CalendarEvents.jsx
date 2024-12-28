import React, { useState } from 'react';
import { Calendar } from '../shadcn/calendar';
import { format } from 'date-fns';
import { Button } from '../shadcn/button';
import { Dialog, DialogContent, DialogTrigger } from '../shadcn/dialog';

const CalendarEvents = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([
        { date: '2024-12-28', description: 'Client meeting' },
        { date: '2024-12-30', description: 'Job interview' },
        { date: '2024-12-31', description: 'Goal review' },
    ]);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setDialogOpen(true);
    };

    const eventsForTheDay = events.filter(
        (event) => format(new Date(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );

    return (
        <div className="p-6 bg-white rounded-xl shadow-xl max-w-md mx-auto">
            <div className="flex justify-center mb-6">
                <Calendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    todayClassName="bg-blue-500 text-white rounded-full" // Highlight today with a blue background and white text
                />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-gray-600 hover:bg-gray-100">
                        Ver eventos
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Eventos {format(selectedDate, 'dd/MM/yyyy')}
                    </h3>
                    {eventsForTheDay.length === 0 ? (
                        <p className="text-gray-600">No hay eventos en el dia de hoy.</p>
                    ) : (
                        <ul className="space-y-3">
                            {eventsForTheDay.map((event, index) => (
                                <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300">
                                    <p className="text-gray-800">{event.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CalendarEvents;
