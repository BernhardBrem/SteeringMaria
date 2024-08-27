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



public class LedControler:IDataModel{
    public event EventHandler StatusReady;  

	
    public class LedStatus {
	   public string Name {get; set;}
	   public bool On {get; set;}
    }

    public void RequestLedStatus(){
		RequestLedStatusStatic(this);
	}

	
    public static async void RequestLedStatusStatic(LedControler controler){
		List<LedStatus> statusList = await GetLedStatus();
		Trace.WriteLine("Got LED Status");
		Trace.WriteLine("Sending statuschange");
        controler.OnStatusReady(new StatusReadyArgs(statusList));
		Trace.WriteLine("Sent");
        
	}

	public void PutLedStatus(List<LedStatus> status){
	    PutLedStaticStatus(	status);
	}

	public static async void PutLedStaticStatus(List<LedStatus> status){

		var client = DataModel.GetHttpClient();

        Trace.WriteLine("Sending "+status.Count.ToString()+" events");
		HttpResponseMessage result = await client.PutAsJsonAsync<List<LedStatus>>("/LED/Status",status);
		
	}



	private static async Task<List<LedStatus>> GetLedStatus(){
		HttpResponseMessage response = await DataModel.GetResponseAsync("/LED/Status");
		List<LedStatus> result = new List<LedStatus>();
    	if (response.IsSuccessStatusCode)
        {
			Trace.WriteLine("Try to read");
			Trace.WriteLine("Content: " + response.Content.ToString());
			try {
            	result = await response.Content.ReadAsAsync<List<LedStatus>>();
			} catch(Exception e){
				Trace.WriteLine(e.Message);
			}
			Trace.WriteLine("Ready reading");
        }
        return result;

	}

    protected virtual void OnStatusReady(StatusReadyArgs e)  
    {  
            StatusReady?.Invoke(this, e);  
    }  
    

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
	 	Trace.WriteLine("Querying path");
		HttpResponseMessage response = await client.GetAsync(path);
		Trace.WriteLine("Got response");
		return response;
	}

	//public static async Task<HttpResponseMessage> PutAsync(string path, Type ttype,object myObject){
	//	HttpResponseMessage result = await client.PutAsJsonAsync<ttype>(path,(ttype) myObject);
	//	return result;
	//}

}
