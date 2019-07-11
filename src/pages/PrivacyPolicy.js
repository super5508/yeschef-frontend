import React from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from '@material-ui/core/IconButton';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
const useStyles = makeStyles({
  ppcCon: {
    padding: "2.4rem 2.4rem 5.0rem 2.4rem",
    "& p": {
      fontSize: "1.4rem",
      fontWeight: 300,
      opacity: 0.75
    },
    "& ul": {
      paddingLeft: "1.8em"
    },
    "& h2": {
      fontSize: "1.6rem",
      fontWeight: 600,
      marginBottom: "-0.8rem"
    },
    "& h1": {
      display:'flex',
      flexDirection:'row',
      alignContent:'center',
      alignItems:'center',
      marginLeft:'-13px',
      marginBottom:'5px',
      fontSize: "1.8rem",
      fontWeight: 600,
    },
    "& span": {
      marginLeft:'-5px'
    }
  },

  ppcHead1: {
    fontSize: "1.4rem !important",
    margin: "2rem 0rem 1rem 0rem !important"
  },
  ppcP1: {
    marginTop: "0rem",
    fontSize: "1.2rem",
    marginBottom: "1rem"
  },
  boldChr: {
    fontWeight: 600
  }
});

function PrivacyPolicy(props) {
  const classes = useStyles();
  return (
    //ppc => privacyPolicyComponent
    <div className={classes.ppcCon}>
      
      <h1>
        <IconButton
            onClick={() => {
						  props.history.push("/myProfile");
						}}>
          <LeftArrowIcon />
        </IconButton>
        <span>PRIVACY POLICY</span>
      </h1>
      <p className={classes.ppcP1}>Date of Last Revision: July 15, 2018</p>

      <h2 className={classes.ppcHead1}>
        YOUR PRIVACY IS CRITICALLY IMPORTANT TO US.
      </h2>
      <p>This Application collects some Personal Data from its Users.</p>

      <h2>OWNER AND DATA CONTROLLER</h2>
      <p>
        YesChef Ltd. <br />1 Beit Ha'am St Box 3450
        <br />
        Ramot Hashavim, Israel
      </p>
      <p>
        <span className={classes.boldChr}>Owner contact email:</span>{" "}
        hi@yeschef.me
      </p>

      <h2>TYPES OF DATA COLLECTED</h2>
      <p>
        Among the types of Personal Data that this Application collects, by
        itself or through third parties, there are: Cookies, Usage Data, email
        address, first name, last name, country, gender, city, various types of
        Data, unique device identifiers for advertising (Google Advertiser ID or
        IDFA, for example), phone number and Twitter handle.
      </p>
      <p>
        Complete details on each type of Personal Data collected are provided in
        the dedicated sections of this privacy policy or by specific explanation
        texts displayed prior to the Data collection.
        <br />
        Personal Data may be freely provided by the User, or, in case of Usage
        Data, collected automatically when using this Application. Unless
        specified otherwise, all Data requested by this Application is mandatory
        and failure to provide this Data may make it impossible for this
        Application to provide its services. In cases where this Application
        specifically states that some Data is not mandatory, Users are free not
        to communicate this Data without consequences to the availability or the
        functioning of the Service. Users who are uncertain about which Personal
        Data is mandatory are welcome to contact the Owner. Any use of Cookies
        \u2013 or of other tracking tools \u2013 by this Application or by the
        owners of third-party services used by this Application serves the
        purpose of providing the Service required by the User, in addition to
        any other purposes described in the present document and in the Cookie
        Policy, if available.
      </p>
      <p>
        Users are responsible for any third-party Personal Data obtained,
        published or shared through this Application and confirm that they have
        the third party's consent to provide the Data to the Owner.
      </p>

      <h2>MODE AND PLACE OF PROCESSING THE DATA</h2>
      <h2 className={classes.ppcHead1}>METHODS OF PROCESSING</h2>

      <p>
        The Owner takes appropriate security measures to prevent unauthorized
        access, disclosure, modification, or unauthorized destruction of the
        Data. The Data processing is carried out using computers and/or IT
        enabled tools, following organizational procedures and modes strictly
        related to the purposes indicated. In addition to the Owner, in some
        cases, the Data may be accessible to certain types of persons in charge,
        involved with the operation of this Application (administration, sales,
        marketing, legal, system administration) or external parties (such as
        third-party technical service providers, mail carriers, hosting
        providers, IT companies, communications agencies) appointed, if
        necessary, as Data Processors by the Owner. The updated list of these
        parties may be requested from the Owner at any time.
      </p>

      <h2 className={classes.ppcHead1}>LEGAL BASIS OF PROCESSING</h2>
      <p>
        The Owner may process Personal Data relating to Users if one of the
        following applies:
        <ul>
          <li>
            Users have given their consent for one or more specific purposes.
            Note: Under some legislations the Owner may be allowed to process
            Personal Data until the User objects to such processing
            (\u201copt-out\u201d), without having to rely on consent or any
            other of the following legal bases. This, however, does not apply,
            whenever the processing of Personal Data is subject to European data
            protection law;
          </li>
          <li>
            provision of Data is necessary for the performance of an agreement
            with the User and/or for any pre-contractual obligations thereof;
          </li>
          <li>
            processing is necessary for compliance with a legal obligation to
            which the Owner is subject;
          </li>
          <li>
            processing is related to a task that is carried out in the public
            interest or in the exercise of official authority vested in the
            Owner;
          </li>
          <li>
            processing is necessary for the purposes of the legitimate interests
            pursued by the Owner or by a third party.
          </li>
        </ul>
      </p>
      <p>
        In any case, the Owner will gladly help to clarify the specific legal
        basis that applies to the processing, and in particular whether the
        provision of Personal Data is a statutory or contractual requirement, or
        a requirement necessary to enter into a contract.
      </p>

      <h2 className={classes.ppcHead1}>PLACE</h2>
      <p>
        The Data is processed at the Owner's operating offices and in any other
        places where the parties involved in the processing are located.
      </p>
      <p>
        Depending on the User's location, data transfers may involve
        transferring the User's Data to a country other than their own. To find
        out more about the place of processing of such transferred Data, Users
        can check the section containing details about the processing of
        Personal Data.
      </p>
      <p>
        Users are also entitled to learn about the legal basis of Data transfers
        to a country outside the European Union or to any international
        organization governed by public international law or set up by two or
        more countries, such as the UN, and about the security measures taken by
        the Owner to safeguard their Data.
      </p>
      <p>
        If any such transfer takes place, Users can find out more by checking
        the relevant sections of this document or inquire with the Owner using
        the information provided in the contact section.
      </p>

      <h2 className={classes.ppcHead1}>RETENTION TIME</h2>
      <p>
        Personal Data shall be processed and stored for as long as required by
        the purpose they have been collected for.
      </p>
      <p>
        Therefore:
        <ul>
          <li>
            Personal Data collected for purposes related to the performance of a
            contract between the Owner and the User shall be retained until such
            contract has been fully performed.
          </li>
          <li>
            Personal Data collected for the purposes of the Owner\u2019s
            legitimate interests shall be retained as long as needed to fulfill
            such purposes. Users may find specific information regarding the
            legitimate interests pursued by the Owner within the relevant
            sections of this document or by contacting the Owner.
          </li>
        </ul>
      </p>
      <p>
        The Owner may be allowed to retain Personal Data for a longer period
        whenever the User has given consent to such processing, as long as such
        consent is not withdrawn. Furthermore, the Owner may be obliged to
        retain Personal Data for a longer period whenever required to do so for
        the performance of a legal obligation or upon order of an authority.
      </p>
      <p>
        Once the retention period expires, Personal Data shall be deleted.
        Therefore, the right to access, the right to erasure, the right to
        rectification and the right to data portability cannot be enforced after
        expiration of the retention period.
      </p>

      <h2>THE PURPOSES OF PROCESSING</h2>
      <p>
        The Data concerning the User is collected to allow the Owner to provide
        its Services, as well as for the following purposes: Analytics,
        Remarketing and behavioral targeting, Content commenting, Contacting the
        User, Registration and authentication, Advertising, Content performance
        and features testing (A/B testing), Data transfer outside the EU,
        Interaction with external social networks and platforms, Managing
        landing and invitation pages and Tag Management.
      </p>
      <p>
        Users can find further detailed information about such purposes of
        processing and about the specific Personal Data used for each purpose in
        the respective sections of this document.
      </p>

      <h2>DETAILED INFORMATION ON THE PROCESSING OF PERSONAL DATA</h2>
      <p>
        Personal Data is collected for the following purposes and using the
        following services:
      </p>
      <h2 className={classes.ppcHead1}>ADVERTISING</h2>
      <p>
        This type of service allows User Data to be utilized for advertising
        communication purposes displayed in the form of banners and other
        advertisements on this Application, possibly based on User interests.
        This does not mean that all Personal Data are used for this purpose.
        Information and conditions of use are shown below.
        <br />
        Some of the services listed below may use Cookies to identify Users or
        they may use the behavioral retargeting technique, i.e. displaying ads
        tailored to the User\u2019s interests and behavior, including those
        detected outside this Application. For more information, please check
        the privacy policies of the relevant services.
        <br />
        In addition to any opt-out offered by any of the services below, the
        User may opt out of a third-party service's use of cookies by visiting
        the Network Advertising Initiative opt-out page.
      </p>

      <h2>Google AdSense (Google Inc.)</h2>
      <p>
        Google AdSense is an advertising service provided by Google Inc. This
        service uses the \u201cDoubleclick\u201d Cookie, which tracks use of
        this Application and User behavior concerning ads, products and services
        offered.
        <br />
        Users may decide to disable all the Doubleclick Cookies by clicking on:
        google.com/settings/ads/onweb/optout.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2>Facebook Audience Network (Facebook, Inc.)</h2>
      <p>
        Facebook Audience Network is an advertising service provided by
        Facebook, Inc.{" "}
        <span className={classes.boldChr}>
          In order to understand Facebook's use of Data, consult Facebook's data
          policy.
        </span>
      </p>
      <p>
        This Application may use identifiers for mobile devices (including
        Android Advertising ID or Advertising Identifier for iOS, respectively)
        and technologies similar to cookies to run the Facebook Audience Network
        service. One of the ways Audience Network shows ads is by using the
        User's ad preferences. The User can control this in the Facebook ad
        settings.
      </p>
      <p>
        Users may opt-out of certain Audience Network targeting through
        applicable device settings, such as the device advertising settings for
        mobile phones or by following the instructions in other Audience Network
        related sections of this privacy policy, if available.
      </p>
      <p>
        Personal Data collected: Cookies, unique device identifiers for
        advertising (Google Advertiser ID or IDFA, for example) and Usage Data.
      </p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2 className={classes.ppcHead1}>ANALYTICS</h2>
      <p>
        The services contained in this section enable the Owner to monitor and
        analyze web traffic and can be used to keep track of User behavior.
      </p>

      <h2>Google Analytics (Google Inc.)</h2>
      <p>
        Google Analytics is a web analysis service provided by Google Inc.
        (\u201cGoogle\u201d). Google utilizes the Data collected to track and
        examine the use of this Application, to prepare reports on its
        activities and share them with other Google services.
        <br />
        Google may use the Data collected to contextualize and personalize the
        ads of its own advertising network.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2>MixPanel (MixPanel)</h2>
      <p>MixPanel is an analytics service provided by Mixpanel Inc.</p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2>Facebook Ads conversion tracking (Facebook, Inc.)</h2>
      <p>
        Facebook Ads conversion tracking is an analytics service provided by
        Facebook, Inc. that connects data from the Facebook advertising network
        with actions performed on this Application.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy. Privacy Shield
        participant.
      </p>

      <h2>Google Analytics with anonymized IP (Google Inc.)</h2>
      <p>
        Google Analytics is a web analysis service provided by Google Inc.
        (\u201cGoogle\u201d). Google utilizes the Data collected to track and
        examine the use of this Application, to prepare reports on its
        activities and share them with other Google services.
        <br />
        Google may use the Data collected to contextualize and personalize the
        ads of its own advertising network.
        <br />
        This integration of Google Analytics anonymizes your IP address. It
        works by shortening Users' IP addresses within member states of the
        European Union or in other contracting states to the Agreement on the
        European Economic Area. Only in exceptional cases will the complete IP
        address be sent to a Google server and shortened within the US.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2 className={classes.ppcHead1}>CONTACTING THE USER</h2>
      <h2>Mailing list or newsletter (this Application)</h2>
      <p>
        By registering on the mailing list or for the newsletter, the
        User\u2019s email address will be added to the contact list of those who
        may receive email messages containing information of commercial or
        promotional nature concerning this Application. Your email address might
        also be added to this list as a result of signing up to this Application
        or after making a purchase.
      </p>
      <p>
        Personal Data collected: city, country, email address, first name,
        gender and last name.
      </p>

      <h2>Contact form (this Application)</h2>
      <p>
        By filling in the contact form with their Data, the User authorizes this
        Application to use these details to reply to requests for information,
        quotes or any other kind of request as indicated by the form\u2019s
        header.
      </p>
      <p>Personal Data collected: email address, first name and last name.</p>

      <h2>Phone contact (this Application)</h2>
      <p>
        Users that provided their phone number might be contacted for commercial
        or promotional purposes related to this Application, as well as for
        fulfilling support requests.
      </p>
      <p>Personal Data collected: phone number.</p>

      <h2 className={classes.ppcHead1}>CONTENT COMMENTING</h2>
      <p>
        Content commenting services allow Users to make and publish their
        comments on the contents of this Application.
        <br />
        Depending on the settings chosen by the Owner, Users may also leave
        anonymous comments. If there is an email address among the Personal Data
        provided by the User, it may be used to send notifications of comments
        on the same content. Users are responsible for the content of their own
        comments.
        <br />
        If a content commenting service provided by third parties is installed,
        it may still collect web traffic data for the pages where the comment
        service is installed, even when Users do not use the content commenting
        service.
      </p>

      <h2>Facebook Comments (Facebook, Inc.)</h2>
      <p>
        Facebook Comments is a content commenting service provided by Facebook,
        Inc. enabling the User to leave comments and share them on the Facebook
        platform.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy. Privacy Shield
        participant.
      </p>

      <h2 className={classes.ppcHead1}>
        CONTENT PERFORMANCE AND FEATURES TESTING (A/B TESTING)
      </h2>
      <p>
        The services contained in this section allow the Owner to track and
        analyze the User response concerning web traffic or behavior regarding
        changes to the structure, text or any other component of this
        Application.
      </p>

      <h2>Optimizely (Optimizely, Inc.)</h2>
      <p>Optimizely is an A/B testing service provided by Optimizely, Inc.</p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>Place of processing: United States – Privacy Policy.</p>

      <h2 className={classes.ppcHead1}>DATA TRANSFER OUTSIDE THE EU</h2>
      <p>
        The Owner is allowed to transfer Personal Data collected within the EU
        to third countries (i.e. any country not part of the EU) only pursuant
        to a specific legal basis. Any such Data transfer is based on one of the
        legal bases described below.
        <br />
        Users can inquire with the Owner to learn which legal basis applies to
        which specific service.
      </p>

      <h2>
        Data transfer to countries that guarantee European standards (this
        Application)
      </h2>
      <p>
        If this is the legal basis, the transfer of Personal Data from the EU to
        third countries is carried out according to an adequacy decision of the
        European Commission.
        <br />
        The European Commission adopts adequacy decisions for specific countries
        whenever it considers that country to possess and provide Personal Data
        protection standards comparable to those set forth by EU data protection
        legislation. Users can find an updated list of all adequacy decisions
        issued on the European Commission's website.
      </p>
      <p>Personal Data collected: various types of Data.</p>

      <h2 className={classes.ppcHead1}>
        INTERACTION WITH EXTERNAL SOCIAL NETWORKS AND PLATFORMS
      </h2>
      <p>
        This type of service allows interaction with social networks or other
        external platforms directly from the pages of this Application. The
        interaction and information obtained through this Application are always
        subject to the User\u2019s privacy settings for each social network.
        <br />
        This type of service might still collect traffic data for the pages
        where the service is installed, even when Users do not use it.
      </p>

      <h2>Facebook Like button and social widgets (Facebook, Inc.)</h2>
      <p>
        The Facebook Like button and social widgets are services allowing
        interaction with the Facebook social network provided by Facebook, Inc.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy. Privacy Shield
        participant.
      </p>

      <h2 className={classes.ppcHead1}>
        MANAGING LANDING AND INVITATION PAGES
      </h2>
      <p>
        This type of service helps with building and managing landing and
        invitation pages, i.e., pages for presenting a product or service, where
        you may add your contact information such as an email address.
        <br />
        Managing these pages means that these services will handle the Personal
        Data collected through the pages, including Usage Data.
      </p>

      <h2>Unbounce (Unbounce Marketing Solutions Inc.)</h2>
      <p>
        Unbounce is a landing page management service provided by Unbounce
        Marketing Solutions Inc., that allows this Application to collect the
        email addresses of Users interested in its service.
        <br />
        Unbounce allows the Owner to track and analyze the User response
        concerning web traffic or behavior regarding changes to the structure,
        text or any other component of the created landing pages.
      </p>
      <p>Personal Data collected: Cookies, email address and Usage Data.</p>
      <p>Place of processing: Canada – Privacy Policy.</p>

      <h2>Ship by Product Hunt (PRODUCT HUNT, INC.)</h2>
      <p>
        Ship by Product Hunt is a landing page management service provided by
        PRODUCT HUNT, INC., that allows this Application to collect the email
        addresses of Users interested in its service.
        <br />
        Ship by Product Hunt allows the Owner to track and analyze the User
        response concerning web traffic or behavior regarding changes to the
        structure, text or any other component of the created landing pages.
      </p>
      <p>
        Personal Data collected: Cookies, email address, first name, last name,
        Twitter handle and Usage Data.
      </p>
      <p>Place of processing: United States – Privacy Policy.</p>

      <h2>Leadpages (Avenue 81, Inc.)</h2>
      <p>
        Leadpages is a landing page management service provided by Avenue 81,
        Inc., that allows this Application to collect the email addresses of
        Users interested in its service.
        <br />
        Leadpages allows the Owner to track and analyze the User response
        concerning web traffic or behavior regarding changes to the structure,
        text or any other component of the created landing pages.
      </p>
      <p>
        Personal Data collected: email address, Usage Data and various types of
        Data as specified in the privacy policy of the service.
      </p>
      <p>Place of processing: United States – Privacy Policy.</p>

      <h2 className={classes.ppcHead1}>REGISTRATION AND AUTHENTICATION</h2>
      <p>
        By registering or authenticating, Users allow this Application to
        identify them and give them access to dedicated services.
        <br />
        Depending on what is described below, third parties may provide
        registration and authentication services. In this case, this Application
        will be able to access some Data, stored by these third-party services,
        for registration or identification purposes.
      </p>

      <h2>Direct registration (this Application)</h2>
      <p>
        The User registers by filling out the registration form and providing
        the Personal Data directly to this Application.
      </p>
      <p>
        Personal Data collected: city, country, email address, first name,
        gender, last name and various types of Data.
      </p>
      <h2 className={classes.ppcHead1}>REMARKETING AND BEHAVIORAL TARGETING</h2>
      <p>
        This type of service allows this Application and its partners to inform,
        optimize and serve advertising based on past use of this Application by
        the User.
        <br />
        This activity is performed by tracking Usage Data and by using Cookies,
        information that is transferred to the partners that manage the
        remarketing and behavioral targeting activity.
        <br />
        Some services offer a remarketing option based on email address lists.
        In addition to any opt-out offered by any of the services below, the
        User may opt out of a third-party service's use of cookies by visiting
        the Network Advertising Initiative opt-out page.
      </p>

      <h2>Facebook Custom Audience (Facebook, Inc.)</h2>
      <p>
        Facebook Custom Audience is a remarketing and behavioral targeting
        service provided by Facebook, Inc. that connects the activity of this
        Application with the Facebook advertising network.
      </p>
      <p>Personal Data collected: Cookies and email address.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2>Facebook Remarketing (Facebook, Inc.)</h2>
      <p>
        Facebook Remarketing is a remarketing and behavioral targeting service
        provided by Facebook, Inc. that connects the activity of this
        Application with the Facebook advertising network.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2>AdWords Remarketing (Google Inc.)</h2>
      <p>
        AdWords Remarketing is a remarketing and behavioral targeting service
        provided by Google Inc. that connects the activity of this Application
        with the Adwords advertising network and the Doubleclick Cookie.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>Place of processing: United States – Privacy Policy – Opt Out.</p>

      <h2>
        Remarketing through Google Analytics for Display Advertising (Google
        Inc.)
      </h2>
      <p>
        Google Analytics for Display Advertising is a remarketing and behavioral
        targeting service provided by Google Inc. that connects the tracking
        activity performed by Google Analytics and its Cookies with the Adwords
        advertising network and the Doubleclick Cookie.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy – Opt Out. Privacy
        Shield participant.
      </p>

      <h2 className={classes.ppcHead1}>TAG MANAGEMENT</h2>
      <p>
        This type of service helps the Owner to manage the tags or scripts
        needed on this Application in a centralized fashion.
        <br />
        This results in the Users' Data flowing through these services,
        potentially resulting in the retention of this Data.
      </p>

      <h2>Google Tag Manager (Google LLC)</h2>
      <p>
        Google Tag Manager is a tag management service provided by Google LLC.
      </p>
      <p>Personal Data collected: Cookies and Usage Data.</p>
      <p>
        Place of processing: United States – Privacy Policy. Privacy Shield
        participant.
      </p>

      <h2>FURTHER INFORMATION ABOUT PERSONAL DATA</h2>
      <h2 className={classes.ppcHead1}>
        ANALYSIS AND PREDICTIONS BASED ON THE USER\U2019S DATA
        (\U201CPROFILING\U201D)
      </h2>
      <p>
        The Owner may use the Personal and Usage Data collected through this
        Application to create or update User profiles. This type of Data
        processing allows the Owner to evaluate User choices, preferences and
        behaviour for the purposes outlined in the respective section of this
        document.
        <br />
        User profiles can also be created through the use of automated tools
        like algorithms, which can also be provided by third parties. To find
        out more, about the profiling activities performed, Users can check the
        relevant sections of this document.
        <br />
        The User always has a right to object to this kind of profiling
        activity. To find out more about the User's rights and how to exercise
        them, the User is invited to consult the section of this document
        outlining the rights of the User.
      </p>

      <h2 className={classes.ppcHead1}>
        PERSONAL DATA COLLECTED THROUGH SOURCES OTHER THAN THE USER
      </h2>
      <p>
        The Owner of this Application may have legitimately collected Personal
        Data relating to Users without their knowledge by reusing or sourcing
        them from third parties on the grounds mentioned in the section
        specifying the legal basis of processing.
        <br />
        Where the Owner has collected Personal Data in such a manner, Users may
        find specific information regarding the source within the relevant
        sections of this document or by contacting the Owner.
      </p>

      <h2 className={classes.ppcHead1}>
        THE SERVICE IS NOT DIRECTED TO CHILDREN UNDER THE AGE OF 13
      </h2>
      <p>
        Users declare themselves to be adult according to their applicable
        legislation. Minors may use this Application only with the assistance of
        a parent or guardian. Under no circumstance persons under the age of 13
        may use this Application.
      </p>

      <h2>THE RIGHTS OF USERS</h2>
      <p>
        Users may exercise certain rights regarding their Data processed by the
        Owner.
      </p>
      <p>
        In particular, Users have the right to do the following:
        <ul>
          <li>
            <span className={classes.boldChr}>
              Withdraw their consent at any time.
            </span>{" "}
            Users have the right to withdraw consent where they have previously
            given their consent to the processing of their Personal Data.
          </li>
          <li>
            <span className={classes.boldChr}>
              Object to processing of their Data.
            </span>{" "}
            Users have the right to object to the processing of their Data if
            the processing is carried out on a legal basis other than consent.
            Further details are provided in the dedicated section below.
          </li>
          <li>
            <span className={classes.boldChr}>Access their Data.</span> Users
            have the right to learn if Data is being processed by the Owner,
            obtain disclosure regarding certain aspects of the processing and
            obtain a copy of the Data undergoing processing.
          </li>
          <li>
            <span className={classes.boldChr}>
              Verify and seek rectification.{" "}
            </span>{" "}
            Users have the right to verify the accuracy of their Data and ask
            for it to be updated or corrected.
          </li>
          <li>
            <span className={classes.boldChr}>
              Restrict the processing of their Data.
            </span>{" "}
            Users have the right, under certain circumstances, to restrict the
            processing of their Data. In this case, the Owner will not process
            their Data for any purpose other than storing it.
          </li>
          <li>
            <span className={classes.boldChr}>
              Have their Personal Data deleted or otherwise removed.
            </span>{" "}
            Users have the right, under certain circumstances, to obtain the
            erasure of their Data from the Owner.
          </li>
          <li>
            <span className={classes.boldChr}>
              Receive their Data and have it transferred to another controller.{" "}
            </span>{" "}
            Users have the right to receive their Data in a structured, commonly
            used and machine readable format and, if technically feasible, to
            have it transmitted to another controller without any hindrance.
            This provision is applicable provided that the Data is processed by
            automated means and that the processing is based on the User's
            consent, on a contract which the User is part of or on
            pre-contractual obligations thereof.
          </li>
          <li>
            <span className={classes.boldChr}>Lodge a complaint.</span> Users
            have the right to bring a claim before their competent data
            protection authority.
          </li>
        </ul>
      </p>

      <h2 className={classes.ppcHead1}>
        DETAILS ABOUT THE RIGHT TO OBJECT TO PROCESSING
      </h2>
      <p>
        Where Personal Data is processed for a public interest, in the exercise
        of an official authority vested in the Owner or for the purposes of the
        legitimate interests pursued by the Owner, Users may object to such
        processing by providing a ground related to their particular situation
        to justify the objection.
      </p>
      <p>
        Users must know that, however, should their Personal Data be processed
        for direct marketing purposes, they can object to that processing at any
        time without providing any justification. To learn, whether the Owner is
        processing Personal Data for direct marketing purposes, Users may refer
        to the relevant sections of this document.
      </p>

      <h2 className={classes.ppcHead1}>HOW TO EXERCISE THESE RIGHTS</h2>
      <p>
        Any requests to exercise User rights can be directed to the Owner
        through the contact details provided in this document. These requests
        can be exercised free of charge and will be addressed by the Owner as
        early as possible and always within one month.
      </p>

      <h2>ADDITIONAL INFORMATION ABOUT DATA COLLECTION AND PROCESSING</h2>
      <h2 className={classes.ppcHead1}>LEGAL ACTION</h2>
      <p>
        The User's Personal Data may be used for legal purposes by the Owner in
        Court or in the stages leading to possible legal action arising from
        improper use of this Application or the related Services.
        <br />
        The User declares to be aware that the Owner may be required to reveal
        personal data upon request of public authorities.
      </p>

      <h2 className={classes.ppcHead1}>
        ADDITIONAL INFORMATION ABOUT USER'S PERSONAL DATA
      </h2>
      <p>
        In addition to the information contained in this privacy policy, this
        Application may provide the User with additional and contextual
        information concerning particular Services or the collection and
        processing of Personal Data upon request.
      </p>

      <h2 className={classes.ppcHead1}>SYSTEM LOGS AND MAINTENANCE</h2>
      <p>
        For operation and maintenance purposes, this Application and any
        third-party services may collect files that record interaction with this
        Application (System logs) use other Personal Data (such as the IP
        Address) for this purpose.
      </p>

      <h2 className={classes.ppcHead1}>
        INFORMATION NOT CONTAINED IN THIS POLICY
      </h2>
      <p>
        More details concerning the collection or processing of Personal Data
        may be requested from the Owner at any time. Please see the contact
        information at the beginning of this document.
      </p>

      <h2 className={classes.ppcHead1}>
        HOW \U201CDO NOT TRACK\U201D REQUESTS ARE HANDLED
      </h2>
      <p>
        This Application does not support \u201cDo Not Track\u201d requests. To
        determine whether any of the third-party services it uses honor the
        \u201cDo Not Track\u201d requests, please read their privacy policies.
      </p>

      <h2 className={classes.ppcHead1}>CHANGES TO THIS PRIVACY POLICY</h2>
      <p>
        The Owner reserves the right to make changes to this privacy policy at
        any time by giving notice to its Users on this page and possibly within
        this Application and/or - as far as technically and legally feasible -
        sending a notice to Users via any contact information available to the
        Owner. It is strongly recommended to check this page often, referring to
        the date of the last modification listed at the bottom.
      </p>
      <p>
        Should the changes affect processing activities performed on the basis
        of the User\u2019s consent, the Owner shall collect new consent from the
        User, where required.
      </p>

      <h2 className={classes.ppcHead1}>DEFINITIONS AND LEGAL REFERENCES</h2>

      <h2>Personal Data (or Data)</h2>
      <p>
        Any information that directly, indirectly, or in connection with other
        information \u2014 including a personal identification number \u2014
        allows for the identification or identifiability of a natural person.
      </p>

      <h2>Usage Data</h2>
      <p>
        Information collected automatically through this Application (or
        third-party services employed in this Application), which can include:
        the IP addresses or domain names of the computers utilized by the Users
        who use this Application, the URI addresses (Uniform Resource
        Identifier), the time of the request, the method utilized to submit the
        request to the server, the size of the file received in response, the
        numerical code indicating the status of the server's answer (successful
        outcome, error, etc.), the country of origin, the features of the
        browser and the operating system utilized by the User, the various time
        details per visit (e.g., the time spent on each page within the
        Application) and the details about the path followed within the
        Application with special reference to the sequence of pages visited, and
        other parameters about the device operating system and/or the User's IT
        environment.
      </p>

      <h2>User</h2>
      <p>
        The individual using this Application who, unless otherwise specified,
        coincides with the Data Subject.
      </p>

      <h2>Data Subject</h2>
      <p>The natural person to whom the Personal Data refers.</p>

      <h2>Data Processor (or Data Supervisor)</h2>
      <p>
        The natural or legal person, public authority, agency or other body
        which processes Personal Data on behalf of the Controller, as described
        in this privacy policy.
      </p>

      <h2>Data Controller (or Owner)</h2>
      <p>
        The natural or legal person, public authority, agency or other body
        which, alone or jointly with others, determines the purposes and means
        of the processing of Personal Data, including the security measures
        concerning the operation and use of this Application. The Data
        Controller, unless otherwise specified, is the Owner of this
        Application.
      </p>

      <h2>This Application</h2>
      <p>
        The means by which the Personal Data of the User is collected and
        processed.
      </p>

      <h2>Service</h2>
      <p>
        The service provided by this Application as described in the relative
        terms (if available) and on this site/application.
      </p>

      <h2>European Union (or EU)</h2>
      <p>
        Unless otherwise specified, all references made within this document to
        the European Union include all current member states to the European
        Union and the European Economic Area.
      </p>

      <h2>Cookies</h2>
      <p>Small sets of data stored in the User's device.</p>

      <h2>Legal information</h2>
      <p>
        This privacy statement has been prepared based on provisions of multiple
        legislations, including Art. 13/14 of Regulation (EU) 2016/679 (General
        Data Protection Regulation).
      </p>
      <p>
        This privacy policy relates solely to this Application, if not stated
        otherwise within this document.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
