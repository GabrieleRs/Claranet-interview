Point = require('../lib/Point');
describe("Point",( ) => {
    test('Must get the distance between 2 points', () => {
        const x1 = new Point(0,0);
        const x2 = new Point(10,0);
        expect(x1.getDistanceFrom(x2)).toBe(10);
    });
})