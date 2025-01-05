using SteeringMariaMaui.Model;
namespace SteeringMariaMaui;


public partial class BaseSettingPage : ContentPage
{
	
	public BaseSettingPage()
	{
		InitializeComponent();
		if (Preferences.Default.ContainsKey("baseurl")) {
			BaseUrl.Text=Preferences.Default.Get("baseurl","");
            DataModel.SetURI(BaseUrl.Text);
		}
	}
	void OnPowerClicked(object sender, EventArgs e){
		DataModel.RequestShipComputerShutdown();
		((ImageButton)sender).Scale=1.0;
	}


	private void OnEntryTextChanged(object sender, EventArgs e)
	{
	
	}

	private void OnEntryCompleted(object sender, EventArgs e){
        Preferences.Default.Set("baseurl",((Entry)sender).Text);
		DataModel.SetURI(((Entry)sender).Text);
	}
}

