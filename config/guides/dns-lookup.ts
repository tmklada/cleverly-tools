import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "dns-lookup",
  intro: [
    "This free DNS lookup tool checks the DNS records published for any domain name: A, AAAA, MX, CNAME, TXT, NS, SOA, and PTR. Type in a domain, pick a specific record type or leave it on All, and see every matching record and its value returned in one pass, without needing to install a command-line tool or remember dig or nslookup syntax.",
    "DNS (the Domain Name System) is the internet's address book: it's what turns a domain like example.com into the numeric IP address a browser or mail server actually needs to connect to, and it's also where a domain publishes supporting information like which servers handle its email and which third-party services are allowed to send mail on its behalf. Checking these records directly is a normal part of setting up a new domain, moving a website to a new host, configuring email, or troubleshooting why a change hasn't taken effect yet.",
    "Because DNS records are public by design, anyone can look up any domain's records, including your own, which makes this the fastest way to confirm a change actually published correctly before assuming a problem lies somewhere else, like in your email client or your website's code.",
  ],
  sections: [
    {
      heading: "DNS Record Types Explained: A, AAAA, CNAME, MX, TXT, NS",
      paragraphs: [
        "An A record points a domain to an IPv4 address (like 203.0.113.10), and an AAAA record does the same for an IPv6 address; these are the records a browser ultimately needs to load a website. A CNAME record points a subdomain to another domain name instead of an IP address directly, commonly used for things like www.example.com pointing to example.com, or a subdomain pointing at a third-party service's hostname.",
        "MX records list the mail servers responsible for receiving email for a domain, each with a priority number so a backup server can be tried if the primary one is unreachable. TXT records hold arbitrary text data attached to a domain, most often used today for verifying domain ownership with a third-party service or publishing email authentication policies. NS records list which nameservers are authoritative for a domain, meaning which servers are allowed to answer DNS questions about it in the first place.",
      ],
      bullets: [
        "A: domain to IPv4 address",
        "AAAA: domain to IPv6 address",
        "CNAME: domain/subdomain to another domain name (an alias)",
        "MX: mail servers and their priority for a domain",
        "TXT: arbitrary text, commonly used for verification and email policy records",
        "NS: which nameservers are authoritative for the domain",
      ],
    },
    {
      heading: "SOA and PTR Records: The Less Common but Important Ones",
      paragraphs: [
        "The SOA (Start of Authority) record is the administrative header for a domain's DNS zone, holding the primary nameserver, an administrative contact, and timing values that control how long other DNS servers should cache the zone's data and how often they should check for updates. Every properly configured domain has exactly one SOA record, and it's rarely edited directly by most site owners since domain registrars and DNS hosts manage it automatically.",
        "A PTR (Pointer) record does the reverse of an A record: instead of resolving a domain name to an IP address, it resolves an IP address back to a domain name. PTR records matter most for mail servers, since many receiving mail systems check that a sending server's IP has a valid PTR record pointing back to a matching domain as a basic spam-prevention signal; a missing or mismatched PTR record is a common, often overlooked reason legitimate email gets flagged as suspicious.",
      ],
    },
    {
      heading: "How to Check DNS Propagation After Changing Nameservers",
      paragraphs: [
        "DNS propagation is the delay between updating a record at your registrar or DNS host and that change becoming visible everywhere on the internet. It isn't instant because DNS relies heavily on caching for performance: every resolver that already has your old record cached will keep serving it until that cached copy expires, based on the record's TTL (time to live), rather than immediately fetching your new value.",
        "After changing nameservers or updating a record, running a lookup here shows what's currently visible, but keep in mind different networks and resolvers around the world can be at different points in that caching cycle, so it's normal to see the old value from one connection and the new value from another for a while. If a lookup still shows the old record well past its TTL, double-check that the change was actually saved at the correct DNS host, since a change made in the wrong place won't propagate no matter how long you wait.",
      ],
      bullets: [
        "Propagation delay is caused by caching, governed by each record's TTL",
        "Different networks worldwide can show old and new values at the same time during the window",
        "A lower TTL before a planned change means old records expire from caches faster",
        "If a change never appears, verify it was saved at the correct DNS host, not just the registrar",
      ],
    },
    {
      heading: "SPF, DKIM and DMARC TXT Records for Email Deliverability",
      paragraphs: [
        "SPF (Sender Policy Framework) is a TXT record listing which mail servers are allowed to send email on behalf of a domain; a receiving server checks the sending server's IP against this list to help decide if a message is legitimate or possibly spoofed. DKIM (DomainKeys Identified Mail) is a different TXT record holding a public cryptographic key, used to verify that an email's content wasn't altered in transit and that it really was signed by a server authorized for that domain.",
        "DMARC (Domain-based Message Authentication, Reporting and Conformance) is a third TXT record that tells receiving mail servers what to do when a message fails SPF or DKIM checks, such as quarantining it, rejecting it outright, or just monitoring and reporting on failures without blocking anything yet. Missing or misconfigured versions of any of these three records is one of the most common reasons legitimate marketing or transactional email lands in spam, which makes checking them directly a useful first step whenever email deliverability is in question.",
      ],
    },
    {
      heading: "MX Records and Email Delivery Troubleshooting",
      paragraphs: [
        "When email to a domain bounces or never arrives, checking its MX records is usually the first diagnostic step, since it confirms which mail servers are actually supposed to be receiving that domain's mail and whether they're configured at all. A domain with no MX records, or with MX records pointing to a mail provider that was switched away from months ago, will reliably cause delivery failures regardless of how correctly the sending side is configured.",
        "This also matters after migrating email providers, such as moving from one hosted email service to another: if the MX records weren't fully updated, or if an old provider's records are still cached somewhere, mail can keep routing to the previous provider even though the switch looks complete from the admin panel. Comparing the current MX records against what the new provider's setup instructions specify is a quick way to catch this before it causes missed messages.",
      ],
    },
    {
      heading: "What Is a TTL and Why DNS Changes Take Time",
      paragraphs: [
        "TTL (time to live) is a number, measured in seconds, attached to every DNS record that tells other servers how long they're allowed to keep a cached copy before checking for an update. A record with a TTL of 3600 can be cached for up to an hour before a resolver checks back in, while a record with a TTL of 300 gets rechecked every five minutes, making changes visible much faster but adding a small amount of extra lookup traffic in exchange.",
        "The practical takeaway for anyone planning a DNS change, like switching hosting providers or updating an MX record, is to lower the TTL on the record being changed a day or two beforehand if possible, wait for that lower value to take effect everywhere, make the actual change, and only raise the TTL back up once everything is confirmed working, since a low TTL going into a migration means far less time spent waiting on stale, cached records afterward.",
      ],
    },
  ],
  useCases: [
    { title: "Setting up a new domain", description: "Confirm A, AAAA, and NS records are pointing where they should before assuming a website or app is misconfigured." },
    { title: "Troubleshooting email delivery", description: "Check MX, SPF, DKIM, and DMARC records when email isn't arriving or is landing in spam." },
    { title: "Verifying a hosting or DNS migration", description: "Compare current records against what a new host or registrar's instructions specify after moving a domain." },
    { title: "Checking domain ownership verification", description: "Confirm a TXT record required by a third-party service (like a search console or email provider) has published correctly." },
    { title: "Diagnosing propagation delays", description: "See what a lookup currently returns while waiting for a recent DNS change to fully take effect worldwide." },
  ],
  mistakes: [
    { title: "Expecting an instant change", description: "DNS changes are cached according to each record's TTL, so older values can still appear for minutes to hours (sometimes longer) after an update." },
    { title: "Checking the wrong DNS host", description: "If a domain's nameservers point elsewhere, changes made at the registrar won't take effect until they're made at the actual authoritative DNS host." },
    { title: "Assuming one missing record explains everything", description: "Email deliverability issues often involve more than one misconfigured record (MX plus SPF, DKIM, or DMARC), so it's worth checking all of them together." },
    { title: "Forgetting to check both A and AAAA", description: "A domain can have a correct A record but a stale or missing AAAA record, causing inconsistent behavior on IPv6-only networks." },
  ],
  tips: [
    "Lower a record's TTL a day or two before a planned migration so the eventual change propagates faster.",
    "Check MX, SPF, DKIM, and DMARC together when diagnosing email deliverability, not just one in isolation.",
    "Confirm which nameservers (NS records) are authoritative for a domain before troubleshooting records at the wrong DNS host.",
    "Expect some variation in results across networks during a propagation window; that's normal caching behavior, not an error.",
    "Recheck a domain after any hosting or email provider migration to confirm old records were fully replaced.",
  ],
  glossary: [
    { title: "TTL (time to live)", description: "The number of seconds a DNS record can be cached before a resolver is expected to check for an updated value." },
    { title: "Authoritative nameserver", description: "A server officially designated to answer DNS queries for a specific domain, as listed in that domain's NS records." },
    { title: "DNS propagation", description: "The delay between a DNS record being updated and that change becoming visible across every resolver on the internet, driven by caching and TTLs." },
    { title: "SPF / DKIM / DMARC", description: "Three complementary DNS-based email authentication standards used together to help receiving servers verify legitimate senders and reduce spoofing." },
    { title: "Zone", description: "The complete set of DNS records managed together for a domain, with its own SOA record defining administrative details for that set." },
  ],
};

export default guide;
