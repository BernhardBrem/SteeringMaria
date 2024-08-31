using SteeringMariaMaui.Model;
using System.Diagnostics;

namespace SteeringMariaMaui;

public partial class LedSettingsPage : ContentPage
{
	Dictionary<string,LedControler.LedSettings> LedSettings=new Dictionary<string, LedControler.LedSettings>(); 
	LedControler ledControler=new LedControler();

	public LedSettingsPage()
	{
		InitializeComponent();
		ledControler.SettingsReady+=OnSettingsReady;
		ledControler.RequestLedSettings();
	
	}
    
	void OnChannelTextChanged(object sender,  TextChangedEventArgs e){}

	void OnChannelCompleted (object sender,  EventArgs e) {}

	void OnBrightnesSliderValueChanged(object sender,  ValueChangedEventArgs e) {}
    
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

