import React from 'react';
import sd from 'skin-deep';
// import createFlux from 'flux/createFlux';

// import stubApp from '../../../utils/stub-app';
// import ApiClient from '../../../../shared/api-client';

import DealShowAnimation from 'components/deals/deal-show-animation';
import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

chai.should();

describe('DealShowAnimation', () => {
  // let flux;
  // let instance;
  let vdom;

  beforeEach(() => {
    // flux = createFlux(new ApiClient());

    const props = { model: { name: 'foobar@org.com' } };
    // const Stubbed = stubApp(flux)(DealShowAnimation, props);
    const tree = sd.shallowRender(React.createElement(DealShowAnimation, props));

    // instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();
  });

  it('should render correctly', function() {
    const listChildDiv = vdom.props.children[0];
    listChildDiv.should.have.property('type', 'div');
    listChildDiv.props.style.should.have.property('opacity', 1);

    const dealsListChild = listChildDiv.props.children;
    dealsListChild.should.have.property('type', DealsListChild);

    const expanderDiv = vdom.props.children[1];
    expanderDiv.should.have.property('type', 'div');
    expanderDiv.props.style.should.have.property('minHeight', 0);

    const pageContainerDiv = expanderDiv.props.children;
    pageContainerDiv.should.have.property('type', 'div');
    pageContainerDiv.props.style.should.have.property('opacity', 0);

    const dealShow = pageContainerDiv.props.children;
    dealShow.should.have.property('type', DealShow);
  });

  it('should be opened on DealsListChild click', function() {
    const listChildDiv = vdom.props.children[0];
    const dealsListChild = listChildDiv.props.children;
    dealsListChild.props.onSelect();
  });
});
