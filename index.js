const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/ussd', (req, res) => {
  const { sessionID, userID, newSession, msisdn, userData } = req.body;

  let continueSession = true;
  let message = '';

  if (newSession) {
    message = `Welcome to PalomaDataHub\n1. View Data Packages & Rates\n2. Check Account Status\n3. Buy Data Online (Web Link)\n4. Support Hotline`;
  } else if (userData === '1') {
    message = `Data Rates:\n1GB - GHc 10\n5GB - GHc 40\n10GB - GHc 75\nVisit https://bottega-1.github.io/palomadatahub/ to buy online!`;
    continueSession = false;
  } else if (userData === '2') {
    message = `Your registered PalomaDataHub account for ${msisdn || 'this number'} is ACTIVE.\nVisit our web portal for details.`;
    continueSession = false;
  } else if (userData === '3') {
    message = `Visit our website to purchase bundles using Mobile Money:\nhttps://bottega-1.github.io/palomadatahub/`;
    continueSession = false;
  } else if (userData === '4') {
    message = `For inquiries or support, visit our web portal at https://bottega-1.github.io/palomadatahub/`;
    continueSession = false;
  } else {
    message = `Invalid choice. Please dial *928*707# again.`;
    continueSession = false;
  }

  res.json({
    sessionID: sessionID,
    userID: userID,
    continueSession: continueSession,
    message: message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PalomaDataHub USSD server running on port ${PORT}`);
});