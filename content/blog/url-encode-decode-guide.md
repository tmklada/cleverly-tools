---
title: "How to URL Encode and Decode Strings Online (Free Tool)"
description: "URL encode or decode any string instantly online — free, no sign-up. Learn percent encoding, fix broken URLs, and prepare query parameters correctly."
date: "2026-07-01"
author: "cleverly.tools"
category: "developer"
tags: ["url", "encode", "decode", "developer", "percent encoding"]
relatedTool: "url-encoder"
---

## How to URL Encode and Decode Strings Online

Have you ever copied a URL and noticed it contained strange characters like `%20`, `%2F`, or `%3D`? Or tried to pass text through a URL and had it break because of spaces or special characters? This is where URL encoding comes in.

The free [URL Encoder / Decoder](/tools/url-encoder) on cleverly.tools lets you encode or decode any string instantly — no code, no sign-up, no technical knowledge required. Paste your text, click one button, and get the result.

---

## What Is URL Encoding?

URL encoding (also called **percent encoding**) converts characters that are not safe to include in a URL into a format that can be transmitted reliably over the web.

Web addresses (URLs) can only contain a limited set of characters — letters, numbers, and a few symbols. When your URL needs to include something else — like a space, an ampersand, or a non-English character — those characters need to be encoded.

### Examples of Encoded Characters

| Original Character | URL Encoded |
|---|---|
| Space | `%20` |
| `&` | `%26` |
| `=` | `%3D` |
| `/` | `%2F` |
| `?` | `%3F` |
| `#` | `%23` |
| `@` | `%40` |
| `+` | `%2B` |
| Arabic/Hebrew letters | `%D9%85%D8%B1%D8%AD%D8%A8%D8%A7` |

Each encoded character starts with a percent sign `%` followed by two hexadecimal digits representing the character's ASCII or UTF-8 code. That is why it is called "percent encoding."

---

## When Do You Need URL Encoding?

### Building URLs with Query Parameters

If you have a search URL like:
```
https://example.com/search?q=coffee shop near me
```

The space will break the URL. The correctly encoded version is:
```
https://example.com/search?q=coffee%20shop%20near%20me
```

### Passing Special Characters in Forms

HTML forms encode data automatically when submitted, but if you are building URLs manually in code or scripts, you need to encode them yourself.

### Working with APIs

When calling an API with parameters that include special characters, email addresses, or non-English text, URL encoding ensures the parameters reach the server intact.

### Fixing Broken Links

If a URL with special characters stops working, decoding it can reveal what went wrong — and encoding it properly fixes the issue.

---

## How to URL Encode or Decode a String

### Step 1: Open the Tool

Go to the [URL Encoder / Decoder](/tools/url-encoder) on cleverly.tools. No account needed.

### Step 2: Paste Your Text

- To encode: paste your plain text (with spaces, special characters, etc.) into the input field
- To decode: paste the URL-encoded string (with `%20`, `%3D`, etc.) into the input field

### Step 3: Choose Encode or Decode

Click either **"Encode"** or **"Decode"** depending on what you need.

### Step 4: Copy the Result

The result appears instantly. Click **"Copy"** to save it to your clipboard.

---

## URL Encoding vs HTML Encoding — What Is the Difference?

| Feature | URL Encoding | HTML Encoding |
|---|---|---|
| Purpose | Safe transmission in URLs | Safe display in HTML pages |
| Space becomes | `%20` or `+` | (kept as space) |
| `&` becomes | `%26` | `&amp;` |
| `<` becomes | `%3C` | `&lt;` |
| Used in | URLs, query strings, API calls | HTML content, attributes |

Both are forms of encoding, but they serve different purposes and use different syntax. The [URL Encoder / Decoder](/tools/url-encoder) handles URL encoding specifically.

---

## Common URL Encoding Mistakes

- **Encoding the entire URL**: Only the parameter values (and sometimes parameter names) should be encoded — not the protocol (`https://`) or domain (`example.com`). Encoding the full URL breaks it.
- **Confusing `%20` and `+`**: Both represent a space in URLs, but `%20` is the correct form for paths and query values. `+` for spaces is only valid in query strings in some older systems.
- **Double encoding**: Encoding something that is already encoded turns `%20` into `%2520`. Always decode first to check before encoding again.
- **Forgetting non-ASCII characters**: Emoji, Arabic, Chinese, Hebrew, and other non-ASCII characters all need encoding.

---

## Practical Examples

### Example 1: Encoding an email address in a URL
Original: `user@example.com`
Encoded: `user%40example.com`

### Example 2: Encoding a search query
Original: `how to bake a cake & cookies`
Encoded: `how%20to%20bake%20a%20cake%20%26%20cookies`

### Example 3: Decoding a confusing URL
Encoded: `%D7%A9%D7%9C%D7%95%D7%9D`
Decoded: `שלום` (Hebrew for "hello")

---

## Frequently Asked Questions

**Q: Is the URL Encoder / Decoder free to use?**
A: Yes. The [URL Encoder / Decoder](/tools/url-encoder) on cleverly.tools is completely free with no sign-up and no usage limits.

**Q: What is the difference between URL encoding and Base64 encoding?**
A: URL encoding converts special characters to `%XX` format for safe use in web addresses. Base64 encoding converts binary data (like images or files) to text. They solve different problems and are not interchangeable.

**Q: Why does my URL have `%20` in it instead of a space?**
A: `%20` is the URL-encoded version of a space. Browsers and servers automatically encode spaces in URLs to avoid ambiguity. You can use the decoder tool to convert it back to a readable space for display purposes.

**Q: Can I URL encode an entire website address?**
A: You should only encode the parameter values inside a URL, not the entire address. Encoding the full URL — including the `https://` and domain — will break it. If you need to pass a full URL as a query parameter, encode it as the value only.
