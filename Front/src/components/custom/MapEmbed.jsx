const MapEmbed = () => {
    return (
        <div className="">
            <iframe
                className="w-full h-64 rounded-lg shadow-sm"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13146.968331234974!2d-58.3816!3d-34.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac4d1f34cb7%3A0x1beed69ff8c28104!2sCiudad%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1677045100174!5m2!1sen!2sar"
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default MapEmbed;
