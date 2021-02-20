/**
* A Card are a customizeable component that creates hoverable cards with links to different urls when 
* clicked. There are two customizeable card types currently supported: iconOverlay card and photoOverlay
* card that hosts different features.
*
* 
*                                      ***iconOverlay Card***
*
* This card inverts it's color scheme once its hovered. It contains a title, an icon and a hoverIcon
* and customizeable size and alignment attributes.
* 
* **Required Props**
* 
* type:str:(required) Must be either photoOverlay or iconOverlay
* title:str:(required) The cards title
* icon:filePath(required) The filePath pointing to the icon
* hoverIcon:filePath(required) The icon shown when hovering over the card
* 
* 
*                                      ***photoOverlay Card***
* 
* This card shows a hidden picture once its hovered. It contains a title, a background image, 
* a hover image, and customizeable size and alignment attributes. This card also supports static cards 
* if a hover image is not found.
* 
* **Required Props**
* 
* type:str:(required) Must be either photoOverlay or iconOverlay
* title:str:(required) The cards title
* subtitle:str(optional) The cards subtitle
* backgroundImage:filePath(required) The image that backgrounds the title and subtitle
* hoverImage:filePath(optional) The image shown when hovering over the card
* 
* 
*                                      ***Notes***
* 
* customAttrs allows direct modification of the card styles for certain elements. All attributes are
* optional and support all css size units (e.g. px, %, em) if an attribute is not found, it is not 
* modified.
*
* **Supported Attributes**
* 
* height:str/int:(optional) The height of the card
* width:str/int:(optional) The width of the card
* titleSize:str/int:(optional) The fontSize of the title
* subtitleSize:str/int:(optional) The fontSize of the subtitle (photoOverlay only)
* iconSize:str/int:(optional) The size of the icon (iconOverlay only)
* titleHeightAdjust:str/int:(optional) A vertical adjustment to the location of the title (photoOverlay only)
* 
* 
*                                      ***Future Updates***
* 
* 1) Add support for card links
* 
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export const Card = (props) => {

    const { type, title, subtitle="", icon=null, hoverIcon=null, hoverImage=null, backgroundImage=null, customAttrs={} } = props;
    const { height=null, width=null, titleSize=null, subtitleSize=null, titleHeightAdjust=null, iconSize=null } = customAttrs;
    const useCustomAttributes = !!Object.keys(customAttrs).length;

    const [isCardHovered, setCardHover] = useState(false);
    const background = isCardHovered && hoverImage ? `url(${hoverImage})` : `url(${backgroundImage})`;

    const card = () => {
        if (type === 'photoOverlay') {
            return (
                <div className="photo-card-container"
                     data-testid="photo-card-container"
                >
                    <div className="photo-card-content-container"
                         style={{ marginTop: useCustomAttributes && titleHeightAdjust }}
                         data-testid="photo-card-content-container"
                    >
                        <div className={`card-title${isCardHovered && hoverImage  ? ' hidden' : ''}`}
                             style={{ fontSize: useCustomAttributes && titleSize }}
                             data-testid="photo-card-title"
                        >
                            {title}
                        </div>
                        {subtitle &&
                            <div className={`card-subtitle${isCardHovered && hoverImage ? ' hidden' : ''}`}
                                 style={{ fontSize: useCustomAttributes && subtitleSize }}
                                 data-testid="photo-card-subtitle"
                            >
                                {subtitle}
                            </div>
                        }
                    </div>
                </div>
            );
        } else if (type === 'iconOverlay') {
            return (
                <div className="icon-card-container"
                     data-testid="icon-card-container"
                >
                    <div className="icon-card-body">
                        <div className="card-icon-title"
                             style={{ fontSize: useCustomAttributes && titleSize }}
                             data-testid="icon-card-title"
                        >
                            {title}
                        </div>
                        <div className="icon-card-icon-container">
                            <img src={!isCardHovered ? icon : hoverIcon}
                                 style={{ height: useCustomAttributes && iconSize, width: useCustomAttributes && iconSize }}
                                 alt="card-icon"
                                 data-testid="icon-card-visible-icon"
                            >
                            </img>
                        </div>
                    </div>
                </div>
            );
        } else {
            return "";
        }
    };

    return (
        <div className={`card-container${type === 'photoOverlay' ? ' photo-card' : ' icon-card'}${hoverImage || type === 'iconOverlay' ? ' clickable-card' : ''}`}
             style={{ 
                backgroundImage: type === 'photoOverlay' && background, 
                height: useCustomAttributes && height,
                width: useCustomAttributes && width}}
             onMouseEnter={() => setCardHover(true)}
             onMouseLeave={() => setCardHover(false)}
             data-testid="card-container"
        >
            { card() }
        </div>
    );
};

export function validateCard (validationParams, props, propName, componentName) {
    const { validationType } = validationParams;
    const { type: cardType } = props;

    const isRequiredValidationType = ['required', 'requiredIf'].indexOf(validationType) !== -1;

    const iconOverlayProps = ['icon', 'hoverIcon'];
    const photoOverlayProps = ['hoverImage','subtitle','backgroundImage'];
    const commonProps = ['title', 'type'];

    function getPropType() {
        let propType = null;

        const iconOverlayPropFound = [...iconOverlayProps, ...commonProps].indexOf(propName) !== -1;
        const photoOverlayPropFound = [...photoOverlayProps, ...commonProps].indexOf(propName) !== -1;
        const validPropFound = [...iconOverlayProps, ...photoOverlayProps, ...commonProps].indexOf(propName) !== -1;

        if (cardType === 'iconOverlay' && iconOverlayPropFound) {
            propType = 'iconOverlayCard';
        } else if (cardType === 'photoOverlay' && photoOverlayPropFound) {
            propType = 'photoOverlayCard';
        } else if (validPropFound) {
            // Ignore prop checks if the prop is valid but not a member of the chosen card
            propType = 'ignored';
        } else {
            // If the prop is not a member of either card type throw an error
            propType = 'error';
        }
        return propType;
    };

    function validateRequired() {
        const isPropPresent = !!props[propName];

        // Returns a validation error if a prop doesn't exist for the cardType
        function validateRequiredBasic() {
            return new Error(`Missing prop ${propName} passed to ${cardType} ${componentName}`);
        };
        
        // Returns a validation error if a prop doesn't exist determined by cardType and other present props
        function validateRequiredIf() {
            const { ifProps } = validationParams;

            const ifPropVals = ifProps.filter((prop) => Object.keys(props).indexOf(prop) !== -1);

            if (ifPropVals.length !== ifProps.length) {
                return new Error(`Missing prop ${propName} passed to ${cardType} ${componentName}. Expected a ${propName} or the following: ${ifProps.join(', ')}.`);
            }
            return null
        };

        if (validationType === 'required' && !isPropPresent) {
            return validateRequiredBasic();
        } else if (validationType === 'requiredIf' && !isPropPresent) {
            return validateRequiredIf();
        } 
        return null
    };

    const propType = getPropType();

    if (propType === 'ignored') {
        return null;
    } else if (propType === 'error') {
        return new Error(`Prop ${propName} passed to ${componentName} is not valid.`);
    } else if (isRequiredValidationType) {
        return validateRequired();
    } else {
        return new Error(`Validation type ${validationType} is not supported.`);
    }

};

/* istanbul ignore next */
Card.propTypes = {
  type: PropTypes.oneOf(['photoOverlay', 'iconOverlay']).isRequired,
  title: PropTypes.string.isRequired,
  icon: (props, propName, componentName) => validateCard(
    {validationType:'required'}, 
    props, propName, componentName),
  hoverIcon: (props, propName, componentName) => validateCard(
    {validationType:'required'}, 
    props, propName, componentName),
  hoverImage: (props, propName, componentName) => validateCard(
    {validationType:'requiredIf', ifProps: ['subtitle']}, 
    props, propName, componentName),
  subtitle: (props, propName, componentName) => validateCard(
    {validationType:'requiredIf', ifProps: ['hoverImage']},
    props, propName, componentName),
  backgroundImage: (props, propName, componentName) => validateCard(
    {validationType:'required'},
    props, propName, componentName),
};


export default Card;
