import { Link } from 'react-router'
const SectionTitle = ({ title, highlight, lable, to }) => {
    return (
        <div className="flex items-center justify-between gap-8 px-2">
            <div>
                <h2 className="md:text-[26px] text-2xl font-medium text-headingcolor"> {title}
                    {highlight && <span className="text-primary"> {highlight} </span>}
                </h2>
            </div>
            <div>
                {
                    lable && <Link to={to}>
                        <span className="text-primary text-lg cursor-pointer bg-transparent  border border-primary font-medium hover:bg-primary hover:text-white transition-colors duration-200 py-2 px-5 rounded "> {lable} </span>
                    </Link>
                }
            </div>
        </div>
    )
}

export default SectionTitle
