import menuIcon from "./menuIcon.svg";
import PropTypes from 'prop-types';
import { stitches } from '../container/global.styles'

const { styled } = stitches;

const Svg = styled('svg', {
    verticalAlign: '-.125em',
    pointerEvents: 'none',
    fill: 'currentColor',
    marginRight: '.5rem !important',
    listStyle: 'none',
    width: '16px',
    height: '16px',
});

interface Icon {
    name: string,
}

export const Icon = (icon: Icon) => (
    <Svg className={`icon ${icon.name}`}>
        <use xlinkHref={`${menuIcon}#${icon.name}`} />
    </Svg>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};