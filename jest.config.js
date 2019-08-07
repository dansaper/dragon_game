module.exports = {
  preset: "ts-jest",
  testMatch: ["**/test/**/*", "!**/TestUtilities.tsx"],
  setupFilesAfterEnv: ["./setupTests.ts"]
};
