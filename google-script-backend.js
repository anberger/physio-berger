// =========================================================================
// GOOGLE APPS SCRIPT: E-Mail-Versand für Physiotherapie Monia Berger
// Sendet direkt von monia@physioberger.at über den verknüpften Gmail-Alias
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
    
    // Ermittle den verknüpften Alias (monia@physioberger.at)
    var senderAlias = 'monia@physioberger.at';
    var aliases = GmailApp.getAliases();
    for (var i = 0; i < aliases.length; i++) {
      if (aliases[i].toLowerCase().indexOf('physioberger.at') !== -1) {
        senderAlias = aliases[i];
        break;
      }
    }
    
    var recipient = 'monia@physioberger.at';
    
    // 1. E-Mail an Monia Berger (Benachrichtigung über die Anfrage)
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
               
    GmailApp.sendEmail(recipient, subject, body, {
      from: senderAlias,
      name: 'Physiotherapie Monia Berger Website',
      replyTo: email
    });
    
    // 2. Automatische Bestätigungs-E-Mail an den Patienten
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
                        
      GmailApp.sendEmail(email, confirmSubject, confirmBody, {
        from: senderAlias,
        name: 'Physiotherapie Monia Berger',
        replyTo: senderAlias
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hilfsfunktion: 1x im Editor auf 'Ausführen' klicken, um die neue Gmail-Berechtigung zu erteilen
function testPermissions() {
  var aliases = GmailApp.getAliases();
  Logger.log('Gefundene verknüpfte E-Mail-Aliase: ' + JSON.stringify(aliases));
}
