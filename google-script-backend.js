// =========================================================================
// GOOGLE APPS SCRIPT: E-Mail-Versand für Physiotherapie Monia Berger
// Anleitung: Auf script.google.com einfügen und als Web-App veröffentlichen
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
    
    // 1. E-Mail an Monia Berger
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
               
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body,
      replyTo: email
    });
    
    // 2. Automatische, freundliche Bestätigung an den Absender (Patienten)
    if (email && email.indexOf('@') > 0) {
      var confirmSubject = 'Deine Terminanfrage bei Physiotherapie Monia Berger';
      var confirmBody = 'Liebe/r ' + name + ',\n\n' +
                        'vielen Dank für deine Terminanfrage bei Physiotherapie Monia Berger!\n\n' +
                        'Ich habe deine Nachricht erhalten und werde mich so schnell wie möglich persönlich bei dir melden, um einen passenden Termin zu vereinbaren.\n\n' +
                        'Herzliche Grüße,\n' +
                        'Monia Berger\n' +
                        'Physiotherapie Fritzens & Hausbesuche\n' +
                        'Telefon: +43 660 4054510\n' +
                        'Website: https://physioberger.at';
                        
      MailApp.sendEmail({
        to: email,
        subject: confirmSubject,
        body: confirmBody,
        replyTo: recipient
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
