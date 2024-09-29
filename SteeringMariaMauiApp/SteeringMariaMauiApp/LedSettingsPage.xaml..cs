using SteeringMariaMaui.Model;
using System.Diagnostics;

namespace SteeringMariaMaui;

public partial class LedSettingsPage : ContentPage
{
	Dictionary<string,LedControler.LedSettings> LedSettings=new Dictionary<string, LedControler.LedSettings>(); 
	LedControler ledControler=new LedControler();
	string ledName="";

	public LedSettingsPage()
	{
		InitializeComponent();
		ledControler.SettingsReady+=OnSettingsReady;
		ledControler.RequestLedSettings();
	
	}

	void SetSurfaceToLed(){
		var settings=LedSettings[ledName];
		Channel.Text=settings.channel.ToString();
	    Brightnes.Value=settings.brightnes;
	    BrightnesSpan.Value=settings.brightnesspan;
		BrightnesFactor.Value=settings.brightnesfactor;
	}

	void OnLedChanged(object sender, EventArgs e)
    {
  		var picker = (Picker)sender;
  		int selectedIndex = picker.SelectedIndex;
  		if (selectedIndex != -1)
  		{
    		ledName = (string)picker.Items[selectedIndex];
			SetSurfaceToLed();
  		}
	}
    
	

	void OnChannelCompleted (object sender,  EventArgs e) {
		Trace.WriteLine("OnChannelCompleted called!");
        var isNr = int.TryParse(Channel.Text, out int channelNr);
		if (isNr){
			Trace.WriteLine("Got channel nr " + channelNr);
			LedSettings[ledName].channel=channelNr;
            ledControler.UpdateStatus(ledName,LedSettings[ledName]);
		}
		else{
			Channel.Text=LedSettings[ledName].channel.ToString();
		}
    }

	void OnBrightnesSliderValueChanged(object sender,  ValueChangedEventArgs e) {
		LedSettings[ledName].brightnes=(int)Brightnes.Value;
		ledControler.UpdateStatus(ledName,LedSettings[ledName]);

	}


	void OnBrightnesSpanSliderValueChanged(object sender,  ValueChangedEventArgs e) {
		LedSettings[ledName].brightnesspan=(int)BrightnesSpan.Value;
		ledControler.UpdateStatus(ledName,LedSettings[ledName]);
	}
	
	void OnBrightnesFactorSliderValueChanged(object sender,  ValueChangedEventArgs e) {
		LedSettings[ledName].brightnesfactor=BrightnesFactor.Value;
		ledControler.UpdateStatus(ledName,LedSettings[ledName]);
	}
    
	void OnFlickrSpanSliderValueChanged(object sender,  ValueChangedEventArgs e){
		LedSettings[ledName].flickrspan=(int)FlickrSpan.Value;
		ledControler.UpdateStatus(ledName,LedSettings[ledName]);
	}
  
    
	public void OnSettingsReady(object sender,EventArgs args){
		Trace.WriteLine("Updating LED Names");
		var status =(StatusReadyArgs)args;
		LedSettings = (Dictionary<string,LedControler.LedSettings>)status.Status;
		foreach (string k in LedSettings.Keys){
			SourceSelector.Items.Add(k);
		} 
		Trace.WriteLine("Got LedSettings");
		
	}

	
}

