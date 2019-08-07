// add some helpful assertions
import "@testing-library/jest-dom/extend-expect";
// this is basically: afterEach(cleanup)
import "@testing-library/react/cleanup-after-each";

// Mock out requestAnimationFrame in the easiest way we can
beforeEach(() => {
  jest.spyOn(window, "requestAnimationFrame").mockImplementation(cb => {
    cb(0);
    return 0;
  });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});
