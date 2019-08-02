import React from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles({
  tosCon: {
    padding: "2.4rem 2.4rem 5.0rem 2.4rem",
    "& p": {
      opacity: 0.75
    },
    "& ol": {
      paddingLeft: "1.8em"
    },
    "& h2": {
      marginBottom: "-0.8rem"
    },
    "& h1": {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      marginLeft: '-1.5rem',
      marginBottom: '0.5rem',
    },
    "& span": {
      marginLeft: '-0.5rem'
    }
  },
  tosHead1: {
    margin: "2rem 0rem 1rem 0rem !important"
  },
  tosP2: {
    marginTop: "0rem",
    fontSize: '1.2rem',
    fontWeight: 300,
    marginBottom: "1rem"
  },
  boldChr: {
    fontWeight: 600
  },
  fixTopCon: {
    backgroundColor: '#000000',
    position: 'fixed',
    top: '0px',
    width: '100%',
    zIndex: '10',
    height: '6.6rem',
    padding: '2.2rem 2.4rem'
  },

  closeIcon: {
    fontSize: "2rem"
  },
  iconBox: {
    width: "1.2rem",
    height: "1.4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "2.7rem",
    right: "2.4rem",
    zIndex: '15'
  },
});

function TermsOfService(props) {
  const classes = useStyles();
  return (
    //tos => termsOfService
    <div>
      <div className={classes.fixTopCon}>
        <h1>
          <span>TERMS OF SERVICE</span>
        </h1>
      </div>
      <div className={classes.iconBox} onClick={() => props.history.goBack()}>
        <IconButton aria-label="Close">
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </div>

      <div className={classes.tosCon}>

        <p className={classes.tosP2}>Date of Last Revision: July 15, 2018</p>
        <h2 className={classes.tosHead1}>WELCOME TO YESCHEF!</h2>
        <p className='body-text'>
          These terms and conditions outline the rules and regulations for the use
          of YesChef Ltd.'s Website.
      </p>
        <p className='body-text'>
          By accessing this website we assume you accept these terms and
          conditions in full. Do not continue to use YesChef Ltd.'s website if you
        do not accept all of the terms and conditions stated on this page.{" "}
        </p>
        <p className='body-text'>
          The following terminology applies to these Terms and Conditions, Privacy
          Statement and Disclaimer Notice and any or all Agreements: “Client”,
          “You” and “Your” refers to you, the person accessing this website and
          accepting the Company’s terms and conditions. “The Company”,
          “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”,
          “Parties”, or “Us”, refers to both the Client and ourselves, or either
          the Client or ourselves. All terms refer to the offer, acceptance and
          consideration of payment necessary to undertake the process of our
          assistance to the Client in the most appropriate manner, whether by
          formal meetings of a fixed duration, or any other means, for the express
          purpose of meeting the Client’s needs in respect of provision of the
          Company’s stated services/products, in accordance with and subject to,
          prevailing law of Israel. Any use of the above terminology or other
          words in the singular, plural, capitalisation and/or he/she or they, are
          taken as interchangeable and therefore as referring to same.
      </p>

        <h2>COOKIES</h2>
        <p className='body-text'>
          We employ the use of cookies. By using YesChef Ltd.'s website you
          consent to the use of cookies in accordance with YesChef Ltd.’s privacy
          policy.
      </p>
        <p className='body-text'>
          Most of the modern day interactive web sites use cookies to enable us to
          retrieve user details for each visit. Cookies are used in some areas of
          our site to enable the functionality of this area and ease of use for
          those people visiting. Some of our affiliate / advertising partners may
          also use cookies.
      </p>

        <h2>LICENSE</h2>
        <p className='body-text'>
          Unless otherwise stated, YesChef Ltd. and/or it’s licensors own the
          intellectual property rights for all material on YesChef Ltd.. All
          intellectual property rights are reserved. You may view and/or print
          pages from http://yeschef.me for your own personal use subject to
          restrictions set in these terms and conditions.
      </p>
        <p className='body-text'>
          You must not:
        <ol>
            <li>Republish material from http://yeschef.me</li>
            <li>Sell, rent or sub-license material from http://yeschef.me</li>
            <li>Reproduce, duplicate or copy material from http://yeschef.me</li>
          </ol>
        </p>
        <p className='body-text'>
          Redistribute content from YesChef Ltd. (unless content is specifically
          made for redistribution).
      </p>

        <h2>USER COMMENTS</h2>
        <p className='body-text'>
          <ol>
            <li>This Agreement shall begin on the date hereof.</li>
            <li>
              Certain parts of this website offer the opportunity for users to
              post and exchange opinions, information, material and data
              ('Comments') in areas of the website. YesChef Ltd. does not screen,
              edit, publish or review Comments prior to their appearance on the
              website and Comments do not reflect the views or opinions ofYesChef
              Ltd., its agents or affiliates. Comments reflect the view and
              opinion of the person who posts such view or opinion. To the extent
              permitted by applicable laws YesChef Ltd.shall not be responsible or
              liable for the Comments or for any loss cost, liability, damages or
              expenses caused and or suffered as a result of any use of and/or
              posting of and/or appearance of the Comments on this website.
          </li>
            <li>
              YesChef Ltd.reserves the right to monitor all Comments and to remove
              any Comments which it considers in its absolute discretion to be
              inappropriate, offensive or otherwise in breach of these Terms and
              Conditions.
          </li>
            <li>
              <ol>
                <li>
                  You are entitled to post the Comments on our website and have
                  all necessary licenses and consents to do so;
              </li>
                <li>
                  The Comments do not infringe any intellectual property right,
                  including without limitation copyright, patent or trademark, or
                  other proprietary right of any third party;
              </li>
                <li>
                  The Comments do not contain any defamatory, libelous, offensive,
                  indecent or otherwise unlawful material or material which is an
                  invasion of privacy
              </li>
                <li>
                  The Comments will not be used to solicit or promote business or
                  custom or present commercial activities or unlawful activity.
              </li>
              </ol>
            </li>
            <li>
              You hereby grant to{" "}
              <span className={classes.boldChr}>YesChef Ltd.</span> a
              non-exclusive royalty-free license to use, reproduce, edit and
              authorize others to use, reproduce and edit any of your Comments in
              any and all forms, formats or media.
          </li>
          </ol>
        </p>

        <h2>HYPERLINKING TO OUR CONTENT</h2>
        <p className='body-text'>
          <ol>
            <li>
              The following organizations may link to our Web site without prior
              written approval:
            <ol>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>
                  Online directory distributors when they list us in the directory
                  may link to our Web site in the same manner as they hyperlink to
                  the Web sites of other listed businesses; and
              </li>
                <li>
                  Systemwide Accredited Businesses except soliciting non-profit
                  organizations, charity shopping malls, and charity fundraising
                  groups which may not hyperlink to our Web site.
              </li>
              </ol>
            </li>
            <li>
              These organizations may link to our home page, to publications or to
              other Web site information so long as the link: (a) is not in any
              way misleading; (b) does not falsely imply sponsorship, endorsement
              or approval of the linking party and its products or services; and
              (c) fits within the context of the linking party's site.
          </li>
            <li>
              We may consider and approve in our sole discretion other link
              requests from the following types of organizations:
            <ol>
                <li>
                  commonly-known consumer and/or business information sources such
                  as Chambers of Commerce, American Automobile Association, AARP
                  and Consumers Union;
              </li>
                <li>dot.com community sites;</li>
                <li>
                  associations or other groups representing charities, including
                  charity giving sites,
              </li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>
                  accounting, law and consulting firms whose primary clients are
                  businesses; and
              </li>
                <li>educational institutions and trade associations.</li>
              </ol>
            </li>
          </ol>
        </p>
        <p className='body-text'>
          We will approve link requests from these organizations if we determine
          that: (a) the link would not reflect unfavorably on us or our accredited
          businesses (for example, trade associations or other organizations
          representing inherently suspect types of business, such as work-at-home
          opportunities, shall not be allowed to link); (b)the organization does
          not have an unsatisfactory record with us; (c) the benefit to us from
          the visibility associated with the hyperlink outweighs the absence of ;
          and (d) where the link is in the context of general resource information
          or is otherwise consistent with editorial content in a newsletter or
          similar product furthering the mission of the organization.
      </p>
        <p className='body-text'>
          These organizations may link to our home page, to publications or to
          other Web site information so long as the link: (a) is not in any way
          misleading; (b) does not falsely imply sponsorship, endorsement or
          approval of the linking party and it products or services; and (c) fits
          within the context of the linking party's site.
      </p>
        <p className='body-text'>
          If you are among the organizations listed in paragraph 2 above and are
          interested in linking to our website, you must notify us by sending an
          e-mail to hi@yeschef.me. Please include your name, your organization
          name, contact information (such as a phone number and/or e-mail address)
          as well as the URL of your site, a list of any URLs from which you
          intend to link to our Web site, and a list of the URL(s) on our site to
          which you would like to link. Allow 2-3 weeks for a response.
      </p>
        <p className='body-text'>
          Approved organizations may hyperlink to our Web site as follows:
        <ol>
            <li>By use of our corporate name; or</li>
            <li>
              By use of the uniform resource locator (Web address) being linked
              to; or
          </li>
            <li>
              By use of any other description of our Web site or material being
              linked to that makes sense within the context and format of content
              on the linking party's site.
          </li>
          </ol>
        </p>
        <p className='body-text'>
          No use of YesChef Ltd.’s logo or other artwork will be allowed for
          linking absent a trademark license agreement.
      </p>
        <h2>IFRAMES</h2>
        <p className='body-text'>
          Without prior approval and express written permission, you may not
          create frames around our Web pages or use other techniques that alter in
          any way the visual presentation or appearance of our Web site.
      </p>

        <h2>RESERVATION OF RIGHTS</h2>
        <p className='body-text'>
          We reserve the right at any time and in its sole discretion to request
          that you remove all links or any particular link to our Web site. You
          agree to immediately remove all links to our Web site upon such request.
          We also reserve the right to amend these terms and conditions and its
          linking policy at any time. By continuing to link to our Web site, you
          agree to be bound to and abide by these linking terms and conditions.
      </p>

        <h2>REMOVAL OF LINKS FROM OUR WEBSITE</h2>
        <p className='body-text'>
          If you find any link on our Web site or any linked web site
          objectionable for any reason, you may contact us about this. We will
          consider requests to remove links but will have no obligation to do so
          or to respond directly to you.
      </p>
        <p className='body-text'>
          Whilst we endeavour to ensure that the information on this website is
          correct, we do not warrant its completeness or accuracy; nor do we
          commit to ensuring that the website remains available or that the
          material on the website is kept up to date.
      </p>

        <h2>CONTENT LIABILITY</h2>
        <p className='body-text'>
          We shall have no responsibility or liability for any content appearing
          on your Web site. You agree to indemnify and defend us against all
          claims arising out of or based upon your Website. No link(s) may appear
          on any page on your Web site or within any context containing content or
          materials that may be interpreted as libelous, obscene or criminal, or
          which infringes, otherwise violates, or advocates the infringement or
          other violation of, any third party rights.
      </p>

        <h2>DISCLAIMER</h2>
        <p className='body-text'>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website (including, without limitation, any warranties
          implied by law in respect of satisfactory quality, fitness for purpose
          and/or the use of reasonable care and skill). Nothing in this disclaimer
          will:
        <ol>
            <li>
              limit or exclude our or your liability for death or personal injury
              resulting from negligence;
          </li>
            <li>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
          </li>
            <li>
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
          </li>
            <li>
              exclude any of our or your liabilities that may not be excluded
              under applicable law.
          </li>
          </ol>
        </p>
        <p className='body-text'>
          The limitations and exclusions of liability set out in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the disclaimer
          or in relation to the subject matter of this disclaimer, including
          liabilities arising in contract, in tort (including negligence) and for
          breach of statutory duty.
      </p>
        <p className='body-text'>
          To the extent that the website and the information and services on the
          website are provided free of charge, we will not be liable for any loss
          or damage of any nature.
      </p>
        <h2>YESCHEF LTD.</h2>
        <p className='body-text'>
          1 Beit Ha'am St Box 3450
        <br />
          Ramot Hashavim, Israel
      </p>
        <p className='body-text'>
          <span className={classes.boldChr}>Owner contact email: </span>
          hi@yeschef.me
      </p>
      </div>
    </div>
  );
}

export default TermsOfService;
