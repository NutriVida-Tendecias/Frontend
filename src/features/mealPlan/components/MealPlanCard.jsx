import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

const MealPlanCard = ({ recipe, type }) => {
    const { entities, ids } = recipe;
    const { image, label, source, url, dietLabels, healthLabels } = entities[ids];

    return (
        <div className="border-2 border-orange-200 flex flex-col gap-5 bg-orange-100 p-3 rounded-lg text-sm" key={ids}>
            <h2 className="text-blue-500 font-bold text-xl">{type}</h2>
            <div className="flex flex-col md:flex-row gap-5 items-center">
                <img src={image} alt="food" width={280} height={280} className="md:order-1" />
                <div className="flex flex-col flex-1 md:order-2">
                    <h3 className="text-orange-500 text-xl font-bold">{label}</h3>
                    <br />
                    <h4 className="text-base font-bold text-orange-500">Etiqueta sanitaria</h4>
                    <div className="flex gap-1 flex-wrap">
                        {healthLabels.map(health => (
                            <div key={`${health}`} className="bg-lime-700 text-white px-2 py-1 text-xs rounded-full">{health}</div>
                        ))}
                    </div>
                    <br />
                    <h4 className="text-base font-bold text-orange-500">Etiqueta de dieta</h4>
                    <div className="flex gap-1 flex-wrap">
                        {dietLabels.map(diet => (
                            <div key={`${diet}`} className="bg-green-700 text-white px-2 py-1 text-xs rounded-full">
                                {diet}
                            </div>
                        ))}
                    </div
                    ><br />
                    <Link to={url} target="_blank" rel="noopener noreferrer" className="text-base flex justify-center items-center text-blue-500 hover:text-blue-400 font-bold break-all text-right">
                        {source}    
                        <AiOutlineLink />
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default MealPlanCard;
