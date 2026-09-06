// =========================================================================
// GOOGLE APPS SCRIPT: E-Mail-Versand für Physiotherapie Monia Berger
// Sendet NUR an monia@physioberger.at (KEINE E-Mail an den Website-Nutzer)
// =========================================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var name = data.name || 'Kein Name angegeben';
    var phone = data.phone || 'Keine Telefonnummer';
    var email = data.email || 'Keine E-Mail';
    var loc = data.loc || 'Praxis Fritzens';
    var address = data.address || 'Praxis Fritzens (Bichlweg 17b)';
    var message = data.message || 'Keine zusätzliche Nachricht.';
    
    var recipient = 'monia@physioberger.at';
    
    // E-Mail ausschließlich an Monia Berger
    var subject = 'Neue Terminanfrage von ' + name + ' (' + loc + ')';
    var body = 'Hallo Monia,\n\n' +
               'du hast eine neue Terminanfrage über deine Website physioberger.at erhalten:\n\n' +
               '--------------------------------------------------\n' +
               'Name:           ' + name + '\n' +
               'Telefon:        ' + phone + '\n' +
               'E-Mail:         ' + email + '\n' +
               'Behandlungsort: ' + loc + '\n' +
               (loc === 'Hausbesuch' ? 'Hausbesuch-Adresse: ' + address + '\n' : '') +
               '--------------------------------------------------\n\n' +
               'Nachricht des Patienten:\n' + message + '\n\n' +
               'Viele Grüße,\n' +
               'Deine Website physioberger.at';
               
    // Senden an Monia mit Reply-To auf den Patienten (zum direkten Antworten)
    GmailApp.sendEmail(recipient, subject, body, {
      name: 'Physiotherapie Monia Berger Website',
      replyTo: email
    });
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
