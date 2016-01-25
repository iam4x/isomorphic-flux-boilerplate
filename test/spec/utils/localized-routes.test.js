import { generateRoute, replaceParams } from 'utils/localized-routes';

chai.should();

describe('LocalizedRoutes utils', function () {
  it('should return an array of routes', function () {
    const routes = generateRoute({
      paths: [ 'a', 'b', 'c' ],
      component() {}
    });
    routes.length.should.eql(3);
  });

  it('should replace params in url', function () {
    const route = replaceParams('/foo/:bar/bar/:foo', { bar: 'yolo', foo: 'swag' });
    route.should.eql('/foo/yolo/bar/swag');
  });

  it('should ignore inexisting params', function () {
    const route = replaceParams('/foo', { bar: 'foo' });
    route.should.eql('/foo');
  });
});
