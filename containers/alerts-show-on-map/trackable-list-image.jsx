import cx from 'classnames';
import '../../styles/alert-show-on-map/image.scss';

const NoImage = () => {
    return (
        <svg className="cvo-no-img-block">
            <line className="cvo-no-img-line" x1="0" y1="100%" x2="100%" y2="0" />
            <line className="cvo-no-img-line" x1="100%" y1="100%" x2="0" y2="0" />
        </svg>
    );
};

export const TrackableImage = (props) => {
    let { src, width, height } = props;
    let imgWrapperStyle = { width, height };
    let imgClassName = cx({ 'cvo-no-img': !src }, 'cvo-img', props.className);
    let children = src && props.children || <NoImage />;
    return (
        <div className="cvo-img-wrapper" style={imgWrapperStyle}>
            <div className={imgClassName}>
                {children}
            </div>
        </div>
    );
};