using AngularAuthAPI.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace AngularAuthAPI.UtilityService;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public void SendEmail(EmailModel emailModel)
    {
        var emailMessage = new MimeMessage();
        var from = _config["EmailSettings:From"];
        emailMessage.From.Add(new MailboxAddress("Lets Program", from));
        emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
        emailMessage.Subject = emailModel.Subject;
        emailMessage.Body = new TextPart(TextFormat.Html)
        {
            Text = emailModel.Content
        };

        using(var client = new SmtpClient())
        {
            try
            {
                client.Connect(_config["EmailSettings:SmtpServer"], int.Parse(_config["EmailSettings:Port"]),  SecureSocketOptions.StartTls);
                client.Authenticate(_config["EmailSettings:From"], _config["EmailSettings:Password"]);
                client.Send(emailMessage);
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
