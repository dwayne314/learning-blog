import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card, { validateCard } from './Card';


describe('Card Display', () => {
    const wrappedCard = (props) => render(<Card {...props} />);

    beforeEach(() => {
        jest.clearAllMocks();
        console.error = jest.fn();
    });

    describe('invalid Card Type', () => {

        it('Displays null if the card type is not photoOverlay or iconOverlay', () => {
         const props = {title: 'Spanish', type: "invalidType", backgroundImage: 'src=backgroundImg', subtitle: 'df'};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('card-container').textContent).toBe("");
        });
    });

    describe('photoOverlay Card', () => {

        it('Displays an photo card if the card type is photoOverlay', () => {
            const { getByTestId } = wrappedCard({type: "photoOverlay"})
            expect(getByTestId('photo-card-container')).toBeTruthy();
        });

        it('Displays the title', () => {
            const props = {title: 'Spanish', type: "photoOverlay"};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('photo-card-title').textContent).toBe(props.title);
        });

        it('Displays the subtitle', () => {

            const props = {subtitle: 'Coming Soon!', type: "photoOverlay"};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('photo-card-subtitle').textContent).toBe(props.subtitle);
        });

        it('Displays the background image', () => {
            const props = {type: "photoOverlay", backgroundImage: 'src=backgroundImg'};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('card-container')).toHaveStyle(`background-image: url(${props.backgroundImage})`);
        });

        it('Displays the background image on onMouseEnter with no hover image present', () => {
            const props = {type: "photoOverlay", backgroundImage: 'src=backgroundImg'};
            const  { getByTestId } = wrappedCard(props);
            fireEvent.mouseOver(getByTestId('card-container'));
            expect(getByTestId('card-container')).toHaveStyle(`background-image: url(${props.backgroundImage})`);
        });

        it('Hides the title on onMouseEnter with hover image present', () => {
            const props = {title: 'Spanish', type: "photoOverlay", hoverImage: 'src=hoverImg'};
            const  { getByTestId } = wrappedCard(props);
            fireEvent.mouseOver(getByTestId('card-container'));
            expect(getByTestId('photo-card-title')).toHaveClass('hidden');
        });

        it('Hides the subtitle on onMouseEnter with hover image present', () => {
            const props = {subtitle: 'Coming Soon!', type: "photoOverlay", hoverImage: 'src=hoverImg'};
            const  { getByTestId } = wrappedCard(props);
            fireEvent.mouseOver(getByTestId('card-container'));
            expect(getByTestId('photo-card-subtitle')).toHaveClass('hidden');
        });

        it('Displays the hover image on onMouseEnter with hover image present', () => {
            const props = {type: "photoOverlay", hoverImage: 'src=hoverImg'};
            const  { getByTestId } = wrappedCard(props);
            fireEvent.mouseOver(getByTestId('card-container'));
            expect(getByTestId('card-container')).toHaveStyle(`background-image: url(${props.hoverImage})`);
        });

        it('Displays the background image on onMouseLeave with hover image present', () => {
            const props = {type: "photoOverlay", backgroundImage: 'src=backgroundImg'};
            const  { getByTestId } = wrappedCard(props);
            fireEvent.mouseOver(getByTestId('card-container'));
            fireEvent.mouseLeave(getByTestId('card-container'));
            expect(getByTestId('card-container')).toHaveStyle(`background-image: url(${props.backgroundImage})`);
        });

        it('Is clickable if a hover image is present', () => {
            const  { getByTestId } = wrappedCard({type: "photoOverlay", hoverImage: 'src=hoverImg'});
            expect(getByTestId('card-container')).toHaveClass('clickable-card');
        });

        it('Is not clickable if a hover image is not present', () => {
            const  { getByTestId } = wrappedCard({type: "photoOverlay"});
            expect(getByTestId('card-container').classList.contains('clickable-card')).toBeFalsy();
        });
    });

    describe('iconOverlay Card', () => {

        it('Displays an icon card if the card type is iconOverlay', () => {
            const  { getByTestId } = wrappedCard({type: "iconOverlay"});
            expect(getByTestId('icon-card-container')).toBeTruthy();  
        });

        it('Displays the title', () => {
            const props = {title: 'Spanish', type: "iconOverlay"};
            const  { getByTestId } = wrappedCard({title: 'Spanish', type: "iconOverlay"});
            expect(getByTestId('icon-card-title').textContent).toBe(props.title);
        });

        it('Displays the icon', () => {
            const props = {type: "iconOverlay", icon: 'src=icon'};            
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('icon-card-visible-icon').src).toMatch(new RegExp(`${props.icon}`));
        });

        it('Displays the hover icon on onMouseEnter', () => {
            const props = {type: "iconOverlay", hoverIcon: 'src=hoverIcon'};            
            const  { getByTestId } = wrappedCard(props);
            fireEvent.mouseOver(getByTestId('card-container'));
            expect(getByTestId('icon-card-visible-icon').src).toMatch(new RegExp(`${props.hoverIcon}`));
        });
    });

    describe('Custom Attributes', () => {
        it('height adjusts the height of the card container', () => {
            const customAttrs = { height: '500px'};
            const props = {type: "photoOverlay", title: 'Spanish', customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('card-container')).toHaveStyle(`height: ${props.customAttrs.height}`)
        });

        it('width adjusts the width of the card container', () => {
            const customAttrs = { width: '500px'};
            const props = {type: "photoOverlay", title: 'Spanish', customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('card-container')).toHaveStyle(`width: ${props.customAttrs.width}`);
        });

        it('titleSize adjusts the fontHeight of the title for photoOverlay cards', () => {
            const customAttrs = { titleSize: '30px'};
            const props = {type: "photoOverlay", title: 'Spanish', customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('photo-card-title')).toHaveStyle(`fontSize: ${props.customAttrs.titleSize}`)
        });

        it('titleSize adjusts the fontHeight of the title for iconOverlay cards', () => {
            const customAttrs = { titleSize: '30px'};
            const props = {type: "iconOverlay", title: 'Spanish', customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('icon-card-title')).toHaveStyle(`fontSize: ${props.customAttrs.titleSize}`);
        });

        it('subtitleSize adjusts the fontHeight of the subtitle for photoOverlay cards', () => {
            const customAttrs = { subtitleSize: '50px'};
            const props = {type: "photoOverlay", subtitle: 'Coming Soon!', title: 'Spanish', customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('photo-card-subtitle')).toHaveStyle(`fontSize: ${props.customAttrs.subtitleSize}`);
        });

        it('titleHeightAdjust adjusts the marginTop of the photo card container', () => {
            const customAttrs = { titleHeightAdjust: '500px'};
            const props = {type: "photoOverlay", customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('photo-card-content-container')).toHaveStyle(`marginTop: ${props.customAttrs.height}`);
        });

        it('iconSize adjusts the height and width for icons in an iconOverlay card', () => {
            const customAttrs = { iconSize: '70px'};
            const props = {type: "iconOverlay", icon: 'src=backgroundImg', customAttrs: customAttrs};
            const  { getByTestId } = wrappedCard(props);
            expect(getByTestId('icon-card-visible-icon')).toHaveStyle(`height: ${props.customAttrs.iconSize}`);
            expect(getByTestId('icon-card-visible-icon')).toHaveStyle(`width: ${props.customAttrs.iconSize}`);
        });
    });
});

describe('Card Validation', () => {
    let testComponentName;

    beforeEach(() => {
        testComponentName = 'Card';
    });

    describe('general behavior', () => {

        it('Ignores valid target props from non-chosen card type', () => {
            let props = {type: 'photoOverlay'},
                propName = 'icon'

            let validationError = validateCard({validationType:'required'}, props, propName, testComponentName);
            expect(validationError).toBe(null);
        });

        it('Throws an error if an unsupported prop is provided', () => {
            let props = {type: 'photoOverlay'},
                unsupportedPropName = 'unsupported'

            let validationError = validateCard({validationType:'required'}, props, unsupportedPropName, testComponentName);
            expect(validationError.name).toBe('Error');
            expect(validationError.message).toBe(`Prop ${unsupportedPropName} passed to Card is not valid.`);
        });

        it('Throws an error if an unsupported validation type is provided', () => {
    
            let props = {type: 'iconOverlay'},
                propName = 'icon'

            let validationConfig = {
                validationType: 'unsupportedValidation',
            };
            
            let validationError = validateCard(validationConfig, props, propName, testComponentName);
            expect(validationError.name).toBe('Error');
            expect(validationError.message).toBe(`Validation type ${validationConfig.validationType} is not supported.`);
        });
    });

    describe('basic required behavior', () => {
        it('Throws an error if a required target prop is missing', () => {
            let props = {type: 'iconOverlay'},
                propName = 'icon'

            let validationError = validateCard({validationType:'required'}, props, propName, testComponentName);
            expect(validationError.name).toBe('Error');
            expect(validationError.message).toBe(`Missing prop ${propName} passed to ${props.type} ${testComponentName}`);
        });

        it('Ignores required validation if prop is present', () => {
            let props = {type: 'photoOverlay', icon: '5'},
                propName = 'icon'

            let validationError = validateCard({validationType:'required'}, props, propName, testComponentName);
            expect(validationError).toBe(null);
        });
    });

    describe('requiredIf behavior', () => {
        it('Throws an error if target prop is missing and all required ifProps are missing.', () => {
            let props = {type: 'photoOverlay'},
                propName = 'subtitle'

            let validationConfig = {
                validationType: 'requiredIf',
                ifProps: ['requiredIfProp1', 'requiredIfProp2']
            };

            let validationError = validateCard(validationConfig, props, propName, testComponentName);
            expect(validationError.name).toBe('Error');
            expect(validationError.message).toBe(`Missing prop ${propName} passed to ${props.type} Card. Expected a ${propName} or the following: ${validationConfig.ifProps.join(', ')}.`);
        });

        it('Ignores validation if target prop is present', () => {
            let props = {type: 'photoOverlay', hoverImage: 'imageLocation'},
                propName = 'hoverImage'

            let validationConfig = {
                validationType: 'requiredIf',
                ifProps: ['requiredIfProp1']
            };

            let validationError = validateCard(validationConfig, props, propName, testComponentName);
            expect(validationError).toBe(null);
        });

        it('Ignores validation if all if props are present', () => {
            let props = {type: 'photoOverlay', requiredIfProp1: 'ifPropName'},
                propName = 'hoverImage'

            let validationConfig = {
                validationType: 'requiredIf',
                ifProps: ['requiredIfProp1']
            };

            let validationError = validateCard(validationConfig, props, propName, testComponentName);
            expect(validationError).toBe(null);
        });        
    });
});