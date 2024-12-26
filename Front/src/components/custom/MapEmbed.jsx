const MapEmbed = () => {
    return (
        <div className="">
            <iframe
                className="w-full h-64 rounded-lg shadow-sm"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345097193!2d144.9559283153164!3d-37.817209979751824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f92f7e0214b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1615504616719!5m2!1sen!2sau"
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default MapEmbed;
