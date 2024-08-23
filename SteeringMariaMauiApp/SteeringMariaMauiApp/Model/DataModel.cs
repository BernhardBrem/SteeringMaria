using System.Net.Http;
using System.Net.Http.Headers;
namespace SteeringMariaMaui.Model;

public class LedStatus {
	public string Name {get; set;}
	public bool on {get; set;}

}

public  static class DataModel
 
{
	static HttpClient client = new HttpClient();

	static DataModel(){
		SetURI(Preferences.Default.Get("baseurl",""));
		client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

	}
	

	public static void SetURI(string uri){
	    client.BaseAddress = new Uri(uri);
	}

	public static async Task<List<string>> GetLedNames(){
		HttpResponseMessage response = await client.GetAsync("/LED");
		List<string> result = [];
    	if (response.IsSuccessStatusCode)
        {
            result = await response.Content.ReadAsAsync<List<string>>();
        }
        return result;

	}

}
