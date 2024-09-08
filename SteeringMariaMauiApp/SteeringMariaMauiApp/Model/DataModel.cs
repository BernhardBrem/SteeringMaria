using System.Net.Http;
using System.Net.Http.Headers;
using System.Diagnostics;
namespace SteeringMariaMaui.Model;

public interface IDataModel  
    {  
        event EventHandler StatusReady;  
    }  

public class StatusReadyArgs : EventArgs
    {  
		public StatusReadyArgs(object status){
			Status=status;
		}
        public object Status;
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
	
	static public HttpClient GetHttpClient(){
		return client;
	}

	public static void SetURI(string uri){
		Trace.WriteLine("Set uri to " + uri);
	    client.BaseAddress = new Uri(uri);
		Trace.WriteLine("Client uri is set");
	}

	public static async Task<HttpResponseMessage> GetResponseAsync(string path){
	 	HttpResponseMessage response=null;
		Trace.WriteLine("Querying path");
		try{
		   response = await client.GetAsync(path);
		} catch {
			Trace.WriteLine("Don't get response for " + path);
		}
		Trace.WriteLine("Got response");
		return response;
	}

	//public static async Task<HttpResponseMessage> PutAsync(string path, Type ttype,object myObject){
	//	HttpResponseMessage result = await client.PutAsJsonAsync<ttype>(path,(ttype) myObject);
	//	return result;
	//}

}
