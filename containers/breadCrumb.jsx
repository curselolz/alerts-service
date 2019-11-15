import { Breadcrumb } from 'components';

const BreadCrumbs = ({text}) => {
    return (
        <Breadcrumb size='big'>
            <Breadcrumb.Section>{text}</Breadcrumb.Section>
        </Breadcrumb>
    )
};

export default BreadCrumbs;