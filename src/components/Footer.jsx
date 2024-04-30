const Footer = () => {
    return (
        <footer className="py-5 px-5 w-full flex justify-center items-center bg-white">
            <div className="flex flex-col">
                <h6 className="text-sm font-bold text-blue-600 text-center">NutriVida © 2024</h6>
                <p className="text-xs text-center">Powered by <a href="https://developer.edamam.com/edamam-docs-recipe-api" target="_blank" rel="noopener noreferrer" className="text-lime-700 font-bold hover:text-lime-900">Edamam API</a></p>
            </div>
        </footer>
    );
};

export default Footer;