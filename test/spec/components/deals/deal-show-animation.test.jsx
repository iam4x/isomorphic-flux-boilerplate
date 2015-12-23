import React from 'react';
import sd from 'skin-deep';

import DealShowAnimation from 'components/deals/deal-show-animation';
import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

chai.should();

describe('DealShowAnimation', () => {
  let vdom;
  let spy;
  let listChildDiv;
  let dealsListChild;
  let expanderDiv;
  let pageContainerDiv;
  let dealShow;

  beforeEach(() => {
    const props = { model: { name: 'foobar@org.com' } };
    const tree = sd.shallowRender(React.createElement(DealShowAnimation, props));
    vdom = tree.getRenderOutput();

    listChildDiv = vdom.props.children[0];
    dealsListChild = listChildDiv.props.children;
    expanderDiv = vdom.props.children[1];
    pageContainerDiv = expanderDiv.props.children;
    dealShow = pageContainerDiv.props.children;
  });

  it('should render correctly', function () {
    listChildDiv.should.have.property('type', 'div');
    listChildDiv.props.style.should.have.property('opacity', 1);

    dealsListChild.should.have.property('type', DealsListChild);

    expanderDiv.should.have.property('type', 'div');
    expanderDiv.props.style.should.have.property('minHeight', 0);

    pageContainerDiv.should.have.property('type', 'div');
    pageContainerDiv.props.style.should.have.property('opacity', 0);

    dealShow.should.have.property('type', DealShow);
  });

  it('should be opened on DealsListChild click', function () {
    spy = sinon.spy(dealsListChild.props.onSelect);
    dealsListChild.props.onSelect();
    spy.calledOnce;
    listChildDiv.props.style.should.have.property('opacity', 1);
  });

  it('shoud show listChild and remove pageContainer after close', function (done) {
    spy = sinon.spy(dealShow.props.onClose);
    dealShow.props.onClose();
    spy.calledOnce;
    setTimeout(() => {
      pageContainerDiv.props.style.should.have.property('display', 'none');
      listChildDiv.props.style.should.have.property('opacity', 1);
      done();
    }, 100);
  });
});
