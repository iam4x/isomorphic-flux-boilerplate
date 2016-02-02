import { noop } from 'lodash';
import AltResolver from '../../../shared/alt-resolver';

chai.should();

describe('Alt Resolver', () => {
  let altResolver;

  beforeEach(() => {
    altResolver = new AltResolver();
  });

  it('should map promises on env server', () => {
    altResolver.pendingActions.should.be.empty;
    altResolver.resolve(noop, false);
    altResolver.pendingActions.should.not.be.empty;
  });
});
