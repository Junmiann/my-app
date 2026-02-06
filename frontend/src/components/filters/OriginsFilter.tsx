import { ORIGINS, type Origin } from "../../constants/origins";

type OriginFilterProps = {
    activeOrigin: Origin;
    onChange: (origin: Origin) => void;
};

export default function OriginFilter({
    activeOrigin,
    onChange,
}: OriginFilterProps) {
    return (
        <div className="border-b border-white/20">
            {ORIGINS.map((origin) => (
                <button 
                    key={origin}
                    onClick={() => onChange(origin)}
                    className={`pb-2 mr-6 transition
                        ${activeOrigin === origin
                            ? "font-semibold border-b-2 border-white"
                            : "text-white/60 hover:text-white"
                        }`}>
                            {origin.toLocaleUpperCase()}
                    </button>
            ))}
        </div>
    );
}