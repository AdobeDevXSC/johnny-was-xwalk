export default function decorate(block) {
	const blockImages = block.querySelectorAll('picture');
	const isShipping = block.classList.contains('shipping');

	[...block.children].forEach((div, index) => {		
		if(index === 0){
			div.classList.add('teaser-desktop-wrapper')
			if(isShipping || blockImages.length == 1){
				div.classList.remove('teaser-desktop-wrapper');
				div.classList.add('shipping-icon');
			}
		}; 
		
		if(index == 1){
			div.classList.add('teaser-mobile-wrapper');
			if(isShipping || blockImages.length == 1){
				div.remove();
			}
		};
		
		if(index === 2){
			div.classList.add('teaser-block-link')
			const blockLink = div.querySelector('a');
			if(blockLink && blockImages.length > 1){
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