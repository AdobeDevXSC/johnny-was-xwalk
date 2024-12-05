export default async function decorate(block) {

	[...block.children].forEach((icon) => {
		const iconSpan = icon.querySelector('span');
		const anchorTag = icon.querySelector('a');
		
		const iconDivs = icon.querySelectorAll('div');
		iconDivs.forEach(div => {
			div.remove();
		})

		if(anchorTag != null && !anchorTag.classList.contains('button')){
			anchorTag.textContent = '';
			anchorTag.append(iconSpan);
			icon.append(anchorTag);
		} else {
			icon.append(iconSpan);
		}
	})
	


}
