export default function decorate(block) {
	const blockImages = block.querySelectorAll('picture');
	console.log("block images", blockImages, blockImages.length);

	[...block.children].forEach((div, index) => {
		div.classList.add(`teaser-div-${index}`)
		
		if(index === 0){
			div.classList.add('teaser-desktop-wrapper')
		}; 
		
		if(index == 1){
			div.classList.add('teaser-mobile-wrapper')
		};
		
		if(index === 2){
			div.classList.add('teaser-block-link')
			const blockLink = div.querySelector('a');
			if(blockLink && blockImages){
				const blockHref = blockLink.href;
				blockImages.forEach(pic => {
					pic.closest('div').innerHTML = `
						<a href=${blockHref}>
							${pic.outerHTML}
						</a>`
				})
			}
			div.remove();
		};

		if(index === 3){
			div.classList.add('teaser-text-content');
			const childDiv = div.querySelector('div');
			if(childDiv.children.length === 0){
				div.remove();
			}
		}
	});	

	// media query match that indicates mobile/tablet width
	const isDesktop = window.matchMedia('(min-width: 767px)');

	function toggleImage() {
		if(blockImages.length > 1){
			const mobileImageWrapper = block.querySelector('.teaser-mobile-wrapper');
			const desktopImageWrapper = block.querySelector('.teaser-desktop-wrapper');
			console.log("toggle image", mobileImageWrapper)
			
			if(isDesktop.matches){
				mobileImageWrapper.classList.add('hidden');
				desktopImageWrapper.classList.remove('hidden');
			} else {
				desktopImageWrapper.classList.add('hidden');
				mobileImageWrapper.classList.remove('hidden');
			}
		}
	};

	toggleImage();
	isDesktop.addEventListener('change', () => toggleImage());
}