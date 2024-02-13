'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import {Tables} from '@/types/supabase';

function Responsive({NPCs}: {NPCs: Tables<'npcs'>[]}) {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className='slider-container'>
			<Slider {...settings}>
				{NPCs.map((npc) => (
					<div key={npc.id}>
						<h3>{npc.npc_name}</h3>
						<p>{npc.description}</p>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default Responsive;
