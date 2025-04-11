import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContentStore } from "../store/contentType";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/DateFunction";
import WatchPageSkeleton from "../components/skeleton/WatchPageSkeleton";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";

const AssetDetails = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});
	const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();

	const sliderRef = useRef(null);

	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/content/${contentType}/${id}/trailers`);
				setTrailers(res.data.trailers);

			} catch (error) {
				if (error.message.includes("404")) {
					setTrailers([]);
				}
			}
		};

		getTrailers();
	}, [contentType, id]);

	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await axios.get(`/api/v1/content/${contentType}/${id}/similar`);
				setSimilarContent(res.data.similar);
			} catch (error) {
				if (error.message.includes("404")) {
					setSimilarContent([]);
				}
			}
		};

		getSimilarContent();
	}, [contentType, id]);

	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await axios.get(`/api/v1/content/${contentType}/${id}/details`);
				setContent(res.data.content);
			} catch (error) {
				if (error.message.includes("404")) {
					setContent(null);
				}
			} finally {
				setLoading(false);
			}
		};

		getContentDetails();
	}, [contentType, id]);	

	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	if (loading)
		return (
			<div className='min-h-screen  p-10'>
				<WatchPageSkeleton />
			</div>
		);

	if (!content) {
		return (
			<div className=' text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className=' min-h-screen '>
			<div className='mx-auto container px-4 py-8 h-full'>
				<Navbar />

				<div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
					{trailers?.length > 0 && (
						<ReactPlayer
							controls={true}
							width={"100%"}
							height={"70vh"}
							className='mx-auto overflow-hidden rounded-lg'
							url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
						/>
					)}

					{trailers?.length === 0 && (
						<h2 className='text-xl text-center mt-5'>
							No trailers available for{" "}
							<span className='font-bold text-violet-500'>{content?.title || content?.name}</span> 😥
						</h2>
					)}
				</div>

				{/* movie details */}
				<div
					className='flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto'
				>
					<div className='mb-4 md:mb-0'>
						<h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>

						<p className='mt-2 text-lg'>
							{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
							{content?.adult ? (
								<span className='text-red-600'>18+</span>
							) : (
								<span className='text-green-600'>PG-13</span>
							)}{" "}
						</p>
						<p className='mt-4 text-lg'>{content?.overview}</p>
					</div>
					<img
						src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
						alt='Poster image'
						className='max-h-[600px] rounded-md'
					/>
				</div>

				{similarContent?.length > 0 && (
					<div className='mt-12 max-w-5xl mx-auto relative'>
						<h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>

						<div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
							{similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/AssetDetails/${content.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}

							<ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-violet-600 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-violet-600 
								text-white rounded-full'
								onClick={scrollLeft}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default AssetDetails;