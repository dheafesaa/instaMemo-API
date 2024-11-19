import admin from 'firebase-admin';

export const initializeFirebaseAdmin = () => {
    const serviceAccount = {
        "type": "service_account",
        "project_id": "instamemo-55140",
        "private_key_id": "7b2b17f362f033f1e664032c586e1d491650f446",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7PDN1wv+aLkGq\nFtvkebJHtiTzyUdtzpyWfPFZHkbB70jP59hI8XI4K/r8ygFchroSp5baWxOPhoDn\nmuvcn6vxccErH5s0n+3TNfc2ZCzNwzQ/ASH5ODsAwInXs2+TL3l24dNlRFSWyujJ\nwF26BZ3ftLiHpPuvPZ5XZlp0QdDzcNWCsph/NQjgM758nObofaDObbRiQMuP5HsQ\nJvafo6W27PuDgVqml/WjTiAVEsxUQlI/4Nbnb+D9xSlCgEr++Jx3aZCZwrkxCCzG\nHzYfOzURVTCLMFE2CY0JokRJOseQ0708t4lO3qPsdV9az+fXPzcc5LRhxfoGri84\nCWcdIlmHAgMBAAECggEAU4f6FVGXovt8BBwKohXA+clDFxf3K///UAwRyIZ/XsoY\nG9j9Xx2IrZLBeMHOda8NmID4BhaX1XJWU/2DuHvrw93SJiEFpyaqfY4X6kYqzumF\nh45Dz+HMQPulA3xkDLAjamw5WXZwno2L6WZO6kzTMBh6MtniBz5gQ/G/7Rnn1JL/\naomwOhDi6kcja60TFI5YGSp8OPE8tQp1l+LHU0AQun2zzGDHnfNzTQQfkzRbW2C8\nk4yc+RjNIi4gWno0WzVrrE8YI+XraKxDujwmQSwbXHBy0xDEQ7VATgfdedsgvxou\n2JLqV6lG/kKwC57CI/iNY8Z6SeFf1/mb0A9K97ahwQKBgQD4NWKZEjjgIw3CcWRj\nhvnHvDws5cRDd8HDA7AXgJKhaubNSMM4wAFSB9u6zuMMBaEKmDxuE8XrjCyrPeg0\nZiFHdTFvPAW/tpkCMJe97p8bTttoPCXo2WjWAkhWBArvmammMtskNbLmOBdOerqd\nm6dIeldC6o1trHpet+5dc/Wn8QKBgQDBHNTDT6BEluKn13PaWJbXlj4FMEOI7rF7\n+zrU6XOkOWfbYc5CsXv+QovVpqzdmyv4lo7iIZeEZg/l8XL94EE7z+J12aqO/GO+\n0HBVI0xC3y28lJCRnVq4t1KLlAAsEi0sJpTwrVaw32nUuISK1/t0k8YlD2GCjTfT\nkVy7UsJQ9wKBgAwuEniQfFoDXll8VwDLTtaOViWd4NOuvMNlGu8MUCW7qTfJqkrO\noUH1QMMaA+pDHHP4pH6CWeQFLOv6TbrEiD2JcrOSrnWJ8Fg7KjcXzpb4d6vVx8Z1\nZL+bvRD7gc3gLIMLW9WbDPxfJEWloCK70Kmt1zphaC9Jl3eubvQHDLcBAoGADr6w\n0CjoR9RtgftFcUqKWfOy0JqazX3MN3c7Sr54gfWQJIQXR6hdm1BhdPLBCDqs5NI6\nHrIJ66YPWLNS4GebE4IP/IeeKkTDKPKpYRbM395Ck7+UOkoVfz0gJGAskzDgGhro\nDGhv0hl87y0XkbJkFMajvniqLVmzBYh32CW9iIkCgYEAoPfChCJfWN3M9JyoCvqW\ncMhqgEe+alDy3+o7hBpqh0bDO07grF+H3BR8ELp9rMI7+ISbFRlBsAUkpKSmDNOc\nNDrqzdQ+jF2TlPpsMa5E3KaWtcGjDXFMJJSYJ9rIbI7tNDuAL6LDNsP9CyCO4c25\nZ4UJsAGpd+eJvsTq9NCfheo=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-xvhmn@instamemo-55140.iam.gserviceaccount.com",
        "client_id": "105505072298863902676",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xvhmn%40instamemo-55140.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
};
