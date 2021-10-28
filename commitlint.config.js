module.exports = {
  ignores: [(commit) => commit.includes("init")],
  extends: ["gitmoji"],
};
