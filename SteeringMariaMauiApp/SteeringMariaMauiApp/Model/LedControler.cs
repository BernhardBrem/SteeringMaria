using System.Diagnostics;
namespace SteeringMariaMaui.Model;
public class LedControler:IDataModel{
    public event EventHandler StatusReady;  
	public event EventHandler SettingsReady;  
    public class LedStatus {
	   public string Name {get; set;}
	   public bool On {get; set;}
    }

    public class LedSettings {
	   public int channel {get; set;}
	   public int brightnes {get; set;}
	   public double brightnesspan {get; set;}
	   public double brightnesfactor {get; set;}


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

	public void RequestLedSettings(){
		RequestLedSettingsStatic(this);
	}

	
    public static async void RequestLedSettingsStatic(LedControler controler){
		Dictionary<string,LedSettings> settings = await GetLedSettings();
		Trace.WriteLine("Got LED Settings");
		Trace.WriteLine("Sending settings");
        controler.OnSettingsReady(new StatusReadyArgs(settings));
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

	private static async Task<Dictionary<string,LedSettings>> GetLedSettings(){
		HttpResponseMessage response = await DataModel.GetResponseAsync("/LED/Settings");
		var result = new Dictionary<string,LedSettings>();
    	if (response.IsSuccessStatusCode)
        {
			Trace.WriteLine("Try to read");
			Trace.WriteLine("Content: " + response.Content.ToString());
			try {
            	result = await response.Content.ReadAsAsync<Dictionary<string,LedSettings>>();
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
    

    protected virtual void OnSettingsReady(StatusReadyArgs e)  
    {  
            SettingsReady?.Invoke(this, e);  
    }  
    

}
