import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Topico = ({texto}) => {
    return (
        <div
            className="bg-[#57e18333] items-center flex py-5 px-3 gap-2 border-2 w-full hover:border-[#8bff7e] rounded-2xl"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <CheckCircleIcon className="text-2xl text-green-600" />
            <p>{texto}</p>
        </div>
    );
};
