let grabity = require('grabity');

const grabFunction = async (url) => {
  try {
    let metaData = await grabity.grabIt(
      'https://angel.co/company/enzymecorp/jobs/921769-devops-internal-tooling-engineer'
    );
    return metaData;
  } catch (error) {
    console.log(error);
  }
};

export default grabFunction;
