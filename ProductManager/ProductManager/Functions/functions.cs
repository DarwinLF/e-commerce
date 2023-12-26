namespace ProductManager.Functions
{
    public class functions
    {
        public static string GetImage(string imagePath)
        {
            try
            {
                // Open the file stream
                using (FileStream fileStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read))
                {
                    // Create a buffer to hold the bytes read from the file
                    byte[] buffer = new byte[fileStream.Length];

                    // Read the file into the buffer
                    fileStream.Read(buffer, 0, (int)fileStream.Length);

                    // Convert the buffer to a Base64 string
                    string base64String = Convert.ToBase64String(buffer);

                    return base64String;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return "Invaild Image";
            }
        }
    }
}
